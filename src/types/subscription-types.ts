import type { GenericMessage } from './message-types.js';
import type { DwnInterfaceName, DwnMethodName } from '../index.js';
import type { GeneralJws } from './jws-types.js';
import type { EncryptionProperty } from './records-types.js';

export type SubscriptionScope = {
  interface: DwnInterfaceName;
  method: DwnMethodName;
}

export type SubscriptionConditions = {
};

export type SubscriptionRequestDescriptor = {
  interface: DwnInterfaceName.Subscriptions;
  method: DwnMethodName.Request;
  messageTimestamp: string;
  // The DID of the DWN which the grantee will be given access
  grantedFor: string;
  // The recipient of the grant. Usually this is the author of the SubscriptionRequest message
  grantedTo: string;
  // The granter, who will be either the DWN owner or an entity who the DWN owner has delegated permission to subscribe to.
  grantedBy: string;
  // Optional string that communicates what the grant would be used for
  description?: string;
  scope: SubscriptionScope;
  conditions?: SubscriptionConditions;
};

export type SubscriptionsRequestMessage = GenericMessage & {
  descriptor: SubscriptionRequestDescriptor;
};

export type SubscriptionsGrantDescriptor = {
  interface: DwnInterfaceName.Subscriptions;
  method: DwnMethodName.Grant;
  messageTimestamp: string;
  // Optional CID of a SubscriptionsRequest message. This is optional because grants may be given without being officially requested
  subscriptionsRequestId?: string;
  // Optional timestamp at which this grant will no longer be active.
  dateExpires: string;
  // The DID of the DWN which the grantee will be given access
  grantedFor: string;
  // The recipient of the grant. Usually this is the author of the SubscriptionsRequest message
  grantedTo: string;
  // The granter, who will be either the DWN owner or an entity who the DWN owner has delegated permission to.
  grantedBy: string;
  // Optional string that communicates what the grant would be used for
  description?: string;
  scope: SubscriptionScope;
  conditions?: SubscriptionConditions
};

export type SubscriptionsGrantMessage = GenericMessage & {
  descriptor: SubscriptionsGrantDescriptor;
};

export type SubscriptionsRevokeDescriptor = {
  interface: DwnInterfaceName.Subscriptions;
  method: DwnMethodName.Revoke;
  messageTimestamp: string;
  // The CID of the `SubscriptionsGrant` message being revoked.
  subscriptionsGrantId: string;
};

export type SubscriptionsRevokeMessage = GenericMessage & {
  descriptor: SubscriptionsRevokeDescriptor;
}

export type SubscriptionEventDescriptor = {
  action?: string;
  recordId?: string;
  contextId?: string;
  messageId?: string;
  source?: string;
  encryption?: EncryptionProperty;
  messageTimestamp: string;
}
export type SubscriptionEventMessage = {
  authorization?: GeneralJws;
  descriptor: SubscriptionEventDescriptor;
};
