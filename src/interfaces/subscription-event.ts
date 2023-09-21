import type { SignatureInput } from '../types/jws-types.js';
import type { SubscriptionEventDescriptor, SubscriptionEventMessage } from '../types/subscription-types.js';

import { getCurrentTimeInHighPrecision } from '../utils/time.js';
import { validateAuthorizationIntegrity } from '../core/auth.js';
import { DwnInterfaceName, DwnMethodName, Message } from '../core/message.js';

export type SubscriptionEventOptions = {
  watermark?: string;
  authorizationSignatureInput: SignatureInput;
  messageTimestamp?: string;
};

export class SubscriptionEvent extends Message<SubscriptionEventMessage> {

  public static async parse(message: SubscriptionEventMessage): Promise<SubscriptionEvent> {
    Message.validateJsonSchema(message);
    await validateAuthorizationIntegrity(message);

    return new SubscriptionEvent(message);
  }

  public static async create(options: SubscriptionEventOptions): Promise<SubscriptionEvent> {
    const descriptor: SubscriptionEventDescriptor = {
      interface: DwnInterfaceName.Subscriptions,
      method: DwnMethodName.Create,
      messageTimestamp: options.messageTimestamp ?? getCurrentTimeInHighPrecision(),
    };

    const authorization = await Message.signAsAuthorization(descriptor, options.authorizationSignatureInput);
    const message = { descriptor, authorization };

    Message.validateJsonSchema(message);

    return new SubscriptionEvent(message);
  }
}
