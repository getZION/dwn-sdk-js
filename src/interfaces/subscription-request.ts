import type { SignatureInput } from '../types/jws-types.js';
import type { PermissionConditions, PermissionScope } from '../types/permissions-types.js';
import type { SubscriptionRequestDescriptor, SubscriptionsRequestMessage } from '../types/subscription-types.js';

import { getCurrentTimeInHighPrecision } from '../utils/time.js';
import { removeUndefinedProperties } from '../utils/object.js';
import { validateAuthorizationIntegrity } from '../core/auth.js';
import { DwnInterfaceName, DwnMethodName, Message } from '../core/message.js';

export type SubscriptionsRequestOptions = {
  messageTimestamp?: string;
  description?: string;
  grantedTo: string;
  grantedBy: string;
  grantedFor: string;
  scope: PermissionScope;
  conditions?: PermissionConditions;
  authorizationSignatureInput: SignatureInput;
};

export class SubscriptionsRequest extends Message<SubscriptionsRequestMessage> {

  public static async parse(message: SubscriptionsRequestMessage): Promise<SubscriptionsRequest> {
    await validateAuthorizationIntegrity(message);

    return new SubscriptionsRequest(message);
  }

  public static async create(options: SubscriptionsRequestOptions): Promise<SubscriptionsRequest> {
    const descriptor: SubscriptionRequestDescriptor = {
      interface: DwnInterfaceName.Subscriptions,
      method: DwnMethodName.Request,
      messageTimestamp: options.messageTimestamp ?? getCurrentTimeInHighPrecision(),
      description: options.description,
      grantedTo: options.grantedTo,
      grantedBy: options.grantedBy,
      grantedFor: options.grantedFor,
      scope: options.scope,
      conditions: options.conditions,
    };

    // delete all descriptor properties that are `undefined` else the code will encounter the following IPLD issue when attempting to generate CID:
    // Error: `undefined` is not supported by the IPLD Data Model and cannot be encoded
    removeUndefinedProperties(descriptor);

    const auth = await Message.signAsAuthorization(descriptor, options.authorizationSignatureInput);
    const message: SubscriptionsRequestMessage = { descriptor, authorization: auth };

    Message.validateJsonSchema(message);

    return new SubscriptionsRequest(message);
  }
}
