import type { GenericMessageReply } from '../core/message-reply.js';
import type { MethodHandler } from '../types/method-handler.js';
import type { SubscriptionRequestMessage } from '../types/subscription-types.js';
import type { DidResolver, EventLog, MessageStore } from '../index.js';

import { authenticate } from '../core/auth.js';
import { Message } from '../core/message.js';
import { messageReplyFromError } from '../core/message-reply.js';
import { SubscriptionRequest } from '../interfaces/subscription-request.js';

export class SubscriptionRequestHandler implements MethodHandler {

  constructor(private didResolver: DidResolver, private messageStore: MessageStore, private eventLog: EventLog) {}

  public async handle({
    tenant,
    message
  }: { tenant: string, message: SubscriptionRequestMessage }): Promise<GenericMessageReply> {
    let subscriptionRequest: SubscriptionRequest;
    try {
      subscriptionRequest = await SubscriptionRequest.parse(message);
    } catch (e) {
      return messageReplyFromError(e, 400);
    }

    // authentication
    try {
      await authenticate(message.authorization, this.didResolver);
    } catch (e) {
      return messageReplyFromError(e, 401);
    }

    // store message
    const { scope, conditions, ...propertiesToIndex } = message.descriptor;
    const indexes: { [key: string]: string } = {
      ...propertiesToIndex,
      author: subscriptionRequest.author!,
    };

    // If we have not seen this message before, store it
    const messageCid = await Message.getCid(message);
    const existingMessage = await this.messageStore.get(tenant, messageCid);
    if (existingMessage === undefined) {
      await this.messageStore.put(tenant, message, indexes);
      await this.eventLog.append(tenant, messageCid);
    }

    return {
      status: { code: 202, detail: 'Accepted' }
    };
  }
}
