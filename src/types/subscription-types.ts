import type { DateSort } from '../interfaces/records-query.js';
import type { EncryptionAlgorithm } from '../utils/encryption.js';
import type { GeneralJws } from './jws-types.js';
import type { GenericMessageReply } from '../core/message-reply.js';
import type { KeyDerivationScheme } from '../utils/hd-key.js';
import type { PublicJwk } from './jose-types.js';
import type { Readable } from 'readable-stream';
import type { BaseAuthorizationPayload, GenericMessage } from './message-types.js';
import type { DwnInterfaceName, DwnMethodName } from '../core/message.js';
import type { RecordsFilter, RecordsQueryMessage, RecordsWriteMessage, RecordsDeleteMessage, EncryptionProperty } from './records-types.js';

export type SubscriptionScope = {
  interface: DwnInterfaceName;
  method: DwnMethodName;
};

export type SubscriptionConditions = {
};


export type SubscriptionCreateDescriptor = {
  interface: DwnInterfaceName.Subscriptions;
  method: DwnMethodName.Create;
  protocol?: string;
  protocolPath?: string;
  recipient?: string;
  schema?: string;
  parentId?: string;
  dataCid: string;
  dataSize: number;
  dateCreated: string;
  messageTimestamp: string;
  published?: boolean;
  datePublished?: string;
  dataFormat: string;
};

export type SubscriptionEventDescriptor = {
  action?: string;
  recordId?: string;
  contextId?: string;
  messageId?: string;
  source?: string;
  encryption?: EncryptionProperty;
  messageTimestamp: string;
}

export type SubscriptionFilter = {
  methods?: string[]; // all, create, write, update, delete, etc.
  attester?: string;
  recipient?: string;
  protocol?: string;
  protocolPath?: string;
  contextId?: string;
  schema?: string;
  recordId?: string;
  parentId?: string;
};


export type SubscriptionEventMessage = {
  authorization?: GeneralJws;
  descriptor: SubscriptionEventDescriptor;
};

/**
 * Internal SubscriptionCreate message representation that can be in an incomplete state.
 */
export type InternalSubscriptionWriteMessage = GenericMessage & {
  recordId?: string,
  contextId?: string;
  descriptor: SubscriptionCreateDescriptor;
  attestation?: GeneralJws;
  encryption?: EncryptionProperty;
};

export type SubscriptionCreateMessage = RecordsWriteMessage & {
  active: boolean
};

export type SubscriptionCreateReplyMessage = GenericMessage & {
  id: string;
};


/**
 * Data structure returned in a `SubscriptionQuery` reply entry.
 * NOTE: the message structure is a modified version of the message received, the most notable differences are:
 * 1. does not contain `authorization`
 * 2. may include encoded data
 */
export type SubscriptionQueryReplyEntry = SubscriptionCreateMessage & {
  encodedData?: string;
};

export type SubscriptionQueryDescriptor = {
  interface: DwnInterfaceName.Subscriptions;
  method: DwnMethodName.Query;
  messageTimestamp: string;
  filter: SubscriptionFilter;
  dateSort?: DateSort;
};

export type SubscriptionCreateAttestationPayload = {
  descriptorCid: string;
};

export type SubscriptionCreateAuthorizationPayload = BaseAuthorizationPayload & {
  recordId: string;
  contextId?: string;
  attestationCid?: string;
  encryptionCid?: string;
};


export type SubscriptionQueryMessage = RecordsQueryMessage
export type SubscriptionQueryReply = GenericMessageReply & {
  entries?: SubscriptionQueryReplyEntry[];
};

export type SubscriptionDeleteMessage = RecordsDeleteMessage

export type SubscriptionDeleteDescriptor = {
  interface: DwnInterfaceName.Subscriptions;
  method: DwnMethodName.Delete;
  recordId: string;
  messageTimestamp: string;
};

export type SubscriptionRequestDescriptor = {
  interface: DwnInterfaceName.Subscriptions;
  method: DwnMethodName.Request;
  protocol?: string;
  protocolPath?: string;
  recipient?: string;
  schema?: string;
  parentId?: string;
  dataCid: string;
  dataSize: number;
  dateCreated: string;
  messageTimestamp: string;
  published?: boolean;
  datePublished?: string;
  dataFormat: string;
  scope: SubscriptionScope;
  conditions?: SubscriptionConditions;
}

export type SubscriptionRequestMessage = GenericMessage & {
  descriptor: SubscriptionRequestDescriptor;
};
