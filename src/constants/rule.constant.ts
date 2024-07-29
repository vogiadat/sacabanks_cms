export const APP_RULE = {
  PAGINATION: {
    LIMIT_PAGINATION: 8
  },

  TEXT: {
    LIMIT_TITLE: 30
  },

  FORM: {
    MIN_LENGTH_GENERAL: 1,
    MIN_LENGTH_NAME: 3,
    MAX_LENGTH_NAME: 100,
    MAX_LENGTH_VARCHAR: 255
  },

  FILE: {
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    ACCEPTED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  }
}
