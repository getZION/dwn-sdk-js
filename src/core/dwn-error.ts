/**
 * A class that represents a DWN error.
 */
export class DwnError extends Error {
  constructor (public code: string, message: string) {
    super(`${code}: ${message}`);

    this.name = 'DwnError';
  }
}

/**
 * DWN SDK error codes.
 */
export enum DwnErrorCode {
  AuthenticateJwsMissing = 'AuthenticateJwsMissing',
  AuthorizationMissing = 'AuthorizationMissing',
  AuthorizationUnknownAuthor = 'AuthorizationUnknownAuthor',
  GrantAuthorizationGrantExpired = 'GrantAuthorizationGrantExpired',
  GrantAuthorizationGrantMissing = 'GrantAuthorizationGrantMissing',
  GrantAuthorizationGrantRevoked = 'GrantAuthorizationGrantRevoked',
  GrantAuthorizationInterfaceMismatch = 'GrantAuthorizationInterfaceMismatch',
  GrantAuthorizationMethodMismatch = 'GrantAuthorizationMethodMismatch',
  GrantAuthorizationNotGrantedForTenant = 'GrantAuthorizationNotGrantedForTenant',
  GrantAuthorizationNotGrantedToAuthor = 'GrantAuthorizationNotGrantedToAuthor',
  GrantAuthorizationGrantNotYetActive = 'GrantAuthorizationGrantNotYetActive',
  HdKeyDerivationPathInvalid = 'HdKeyDerivationPathInvalid',
  PermissionsGrantGrantedByMismatch = 'PermissionsGrantGrantedByMismatch',
  PermissionsGrantScopeContextIdAndProtocolPath = 'PermissionsGrantScopeContextIdAndProtocolPath',
  PermissionsGrantScopeSchemaProhibitedFields = 'PermissionsGrantScopeSchemaProhibitedFields',
  PermissionsGrantUnauthorizedGrant = 'PermissionsGrantUnauthorizedGrant',
  PermissionsRevokeMissingPermissionsGrant = 'PermissionsRevokeMissingPermissionsGrant',
  PermissionsRevokeUnauthorizedRevoke = 'PermissionsRevokeUnauthorizedRevoke',
  ProtocolAuthorizationActionNotAllowed = 'ProtocolAuthorizationActionNotAllowed',
  ProtocolAuthorizationIncorrectDataFormat = 'ProtocolAuthorizationIncorrectDataFormat',
  ProtocolAuthorizationIncorrectProtocolPath = 'ProtocolAuthorizationIncorrectProtocolPath',
  ProtocolAuthorizationInvalidSchema = 'ProtocolAuthorizationInvalidSchema',
  ProtocolAuthorizationInvalidType = 'ProtocolAuthorizationInvalidType',
  ProtocolAuthorizationMissingRuleSet = 'ProtocolAuthorizationMissingRuleSet',
  ProtocolsConfigureUnauthorized = 'ProtocolsConfigureUnauthorized',
  ProtocolsQueryUnauthorized = 'ProtocolsQueryUnauthorized',
  RecordsDecryptNoMatchingKeyEncryptedFound = 'RecordsDecryptNoMatchingKeyEncryptedFound',
  RecordsGrantAuthorizationConditionPublicationProhibited = 'RecordsGrantAuthorizationConditionPublicationProhibited',
  RecordsGrantAuthorizationConditionPublicationRequired = 'RecordsGrantAuthorizationConditionPublicationRequired',
  RecordsGrantAuthorizationScopeContextIdMismatch = 'RecordsGrantAuthorizationScopeContextIdMismatch',
  RecordsGrantAuthorizationScopeNotProtocol = 'RecordsGrantAuthorizationScopeNotProtocol',
  RecordsGrantAuthorizationScopeProtocolMismatch = 'RecordsGrantAuthorizationScopeProtocolMismatch',
  RecordsGrantAuthorizationScopeProtocolPathMismatch = 'RecordsGrantAuthorizationScopeProtocolPathMismatch',
  RecordsGrantAuthorizationScopeSchema = 'RecordsGrantAuthorizationScopeSchema',
  RecordsDerivePrivateKeyUnSupportedCurve = 'RecordsDerivePrivateKeyUnSupportedCurve',
  RecordsInvalidAncestorKeyDerivationSegment = 'RecordsInvalidAncestorKeyDerivationSegment',
  RecordsProtocolContextDerivationSchemeMissingContextId = 'RecordsProtocolContextDerivationSchemeMissingContextId',
  RecordsProtocolPathDerivationSchemeMissingProtocol = 'RecordsProtocolPathDerivationSchemeMissingProtocol',
  RecordsReadReturnedMultiple = 'RecordsReadReturnedMultiple',
  RecordsSchemasDerivationSchemeMissingSchema = 'RecordsSchemasDerivationSchemeMissingSchema',
  RecordsWriteGetEntryIdUndefinedAuthor = 'RecordsWriteGetEntryIdUndefinedAuthor',
  RecordsWriteDataCidMismatch = 'RecordsWriteDataCidMismatch',
  RecordsWriteDataSizeMismatch = 'RecordsWriteDataSizeMismatch',
  RecordsWriteMissingAuthorizationSignatureInput = 'RecordsWriteMissingAuthorizationSignatureInput',
  RecordsWriteMissingDataInPrevious = 'RecordsWriteMissingDataInPrevious',
  RecordsWriteMissingDataAssociation = 'RecordsWriteMissingDataAssociation',
  RecordsWriteMissingDataStream = 'RecordsWriteMissingDataStream',
  RecordsWriteMissingProtocol = 'RecordsWriteMissingProtocol',
  RecordsWriteMissingSchema = 'RecordsWriteMissingSchema',
  RecordsWriteValidateIntegrityEncryptionCidMismatch = 'RecordsWriteValidateIntegrityEncryptionCidMismatch',
  Secp256k1KeyNotValid = 'Secp256k1KeyNotValid',
  UrlProtocolNotNormalized = 'UrlProtocolNotNormalized',
  UrlProtocolNotNormalizable = 'UrlProtocolNotNormalizable',
  UrlSchemaNotNormalized = 'UrlSchemaNotNormalized',
  UrlSchemaNotNormalizable = 'UrlSchemaNotNormalizable',
  SubscriptionsGrantAuthorizationConditionPublicationProhibited = 'SubscriptionsGrantAuthorizationConditionPublicationProhibited',
  SubscriptionsGrantAuthorizationConditionPublicationRequired = 'SubscriptionsGrantAuthorizationConditionPublicationRequired',
  SubscriptionsGrantAuthorizationScopeContextIdMismatch = 'SubscriptionsGrantAuthorizationScopeContextIdMismatch',
  SubscriptionsGrantAuthorizationScopeNotProtocol = 'SubscriptionsGrantAuthorizationScopeNotProtocol',
  SubscriptionsGrantAuthorizationScopeProtocolMismatch = 'SubscriptionsGrantAuthorizationScopeProtocolMismatch',
  SubscriptionsGrantAuthorizationScopeProtocolPathMismatch = 'SubscriptionsGrantAuthorizationScopeProtocolPathMismatch',
  SubscriptionsGrantAuthorizationScopeSchema = 'SubscriptionsGrantAuthorizationScopeSchema'
};
