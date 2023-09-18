import type { GenericMessage } from '../types/message-types.js';
import type { MessageStore } from '../types/message-store.js';
import type { RecordsWrite } from './records-write.js';
import type { RecordsFilter } from '../types/records-types.js';
import type { SubscriptionCreateMessage, SubscriptionCreateDescriptor } from '../types/subscription-types.js';

import type { SignatureInput } from '../types/jws-types.js';

import { getCurrentTimeInHighPrecision } from '../utils/time.js';
import { Message } from '../core/message.js';
import { ProtocolAuthorization } from '../core/protocol-authorization.js';
import { Records } from '../utils/records.js';
import { RecordsGrantAuthorization } from '../core/records-grant-authorization.js';
import { removeUndefinedProperties } from '../utils/object.js';
import { validateAuthorizationIntegrity } from '../core/auth.js';
import { DwnInterfaceName, DwnMethodName } from '../core/message.js';

export type SubscribeOptions = {
  filter: RecordsFilter;
  date?: string;
  authorizationSignatureInput?: SignatureInput;
  permissionsGrantId?: string;
};

export class SubscriptionCreate extends Message<SubscriptionCreateMessage> {

  public static async parse(message: SubscriptionCreateMessage): Promise<SubscriptionCreate> {
    if (message.authorization !== undefined) {
      await validateAuthorizationIntegrity(message as GenericMessage);
    }

    const recordsRead = new SubscriptionCreate(message);
    return recordsRead;
  }

  /**
   * Creates a Subscribe message.
   * @param options.recordId If `undefined`, will be auto-filled as a originating message as convenience for developer.
   * @param options.date If `undefined`, it will be auto-filled with current time.
   *
   * @throws {DwnError} when a combination of required SubscribeOptions are missing
   */
  public static async create(options: SubscribeOptions): Promise<Subscribe> {
    const { filter, authorizationSignatureInput, permissionsGrantId } = options;
    const currentTime = getCurrentTimeInHighPrecision();

    const descriptor: SubscriptionCreateDescriptor = {
      interface: DwnInterfaceName.Subscriptions,
      method: DwnMethodName.Create,
      filter: Records.normalizeFilter(filter),
      messageTimestamp: options.date ?? currentTime
    };

    removeUndefinedProperties(descriptor);

    // only generate the `authorization` property if signature input is given
    let authorization = undefined;
    if (authorizationSignatureInput !== undefined) {
      authorization = await Message.signAsAuthorization(descriptor, authorizationSignatureInput, permissionsGrantId);
    }
    const message: SubscriptionCreateMessage = { descriptor, authorization };

    Message.validateJsonSchema(message);

    return new Subscribe(message);
  }

  public async authorize(tenant: string, newestRecordsWrite: RecordsWrite, messageStore: MessageStore): Promise<void> {
    const { descriptor } = newestRecordsWrite.message;

    // if author is the same as the target tenant, we can directly grant access
    if (this.author === tenant) {
      return;
    } else if (descriptor.published === true) {
      // authentication is not required for published data
      return;
    } else if (this.author !== undefined && this.author === descriptor.recipient) {
      // The recipient of a message may always read it
      return;
    } else if (descriptor.protocol !== undefined) {
      // All protocol RecordsWrites must go through protocol auth, because protocolPath, contextId, and record type must be validated
      await ProtocolAuthorization.authorize(tenant, this, newestRecordsWrite, messageStore);
    } else if (this.author !== undefined && this.authorizationPayload?.permissionsGrantId !== undefined) {
      await RecordsGrantAuthorization.authorizeRead(tenant, this, newestRecordsWrite, this.author, messageStore);
    } else {
      throw new Error('message failed authorization');
    }
  }
}
