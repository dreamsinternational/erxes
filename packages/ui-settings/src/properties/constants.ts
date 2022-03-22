export const FIELDS_GROUPS_CONTENT_TYPES = {
  CUSTOMER: 'contacts:customer',
  COMPANY: 'contacts:company',
  PRODUCT: 'product',
  CONVERSATION: 'conversation',
  DEVICE: 'device',
  USER: 'user',
  ALL: ['customer', 'company', 'product', 'conversation', 'device', 'user']
};

export const COLUMN_CHOOSER_EXCLUDED_FIELD_NAMES = {
  LIST: [
    'state',
    'avatar',
    'ownerId',
    'status',
    'integrationId',
    'categoryId',
    'vendorId',
    'emailValidationStatus',
    'phoneValidationStatus',
    'location.countryCode',
    'tagIds'
  ],

  IMPORT: [
    'state',
    'avatar',
    'ownerId',
    'status',
    'integrationId',
    'categoryId',
    'vendorId',
    'emailValidationStatus',
    'phoneValidationStatus',
    'location.countryCode',
    'tagIds',
    'createdAt',
    'modifiedAt',
    'isOnline',
    'lastSeenAt',
    'sessionCount',
    'leadStatus',
    'relatedIntegrationIds',
    'hasAuthority',
    'isSubscribed',
    'stageChangedDate',
    'stageId',
    'userId',
    'modifiedBy',
    'assignedUserIds',
    'watchedUserIds'
  ],
  EXPORT: [
    'state',
    'avatar',
    'ownerId',
    'status',
    'integrationId',
    'categoryId',
    'vendorId',
    'emailValidationStatus',
    'phoneValidationStatus',
    'location.countryCode',
    'tagIds',
    'createdAt',
    'modifiedAt',
    'isOnline',
    'lastSeenAt',
    'sessionCount',
    'leadStatus',
    'relatedIntegrationIds',
    'hasAuthority',
    'isSubscribed'
  ]
};
