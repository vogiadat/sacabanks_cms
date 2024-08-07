export const APP_MESSAGE = {
  GENERAL: {
    FAILED: 'Something was wrong!',
    SUCCESS: 'Successfully !',
    INVALID: 'is invalid !',
    MISSING: 'missing !',

    // HTTP
    NOT_FOUND: 'not found !'
  },

  FORM: {
    SUBMIT_FAILED: 'Error! Please check and fill correct data in form',

    SELECTED_REQUIRED: 'Please select a records',
    SELECTED_EMPTY: 'No items selected',

    FIELD_REQUIRED: 'Không được bỏ trống phần này',
    FIELD_ENUM: 'Only accept: ', // concat the valid value
    FIELD_MINIMUM: 'Minimum is ', // fill your value example 0
    FIELD_MAXIMUM: 'Maximum is ', // fill your value example 100

    NUMBER_INVALID: 'This field must be a number',
    NUMBER_POSITIVE: 'This field must be greater than or equal to 0',

    FIELD_INVALID: 'Kiểu dữ liệu không hợp lệ',
    EMAIL_INVALID: 'Email sai định dạng "email@example.com"',
    PHONE_INVALID: 'Số điện thoại không hợp lệ.',
    CONFIRM_PASSWORD_NOT_MATCH: 'Confirm password do not match',

    ADD_SUCCESS: 'Thêm thành công !',
    ADD_FAILED: 'Lỗi! Thêm mới thất bại !',

    UPLOAD_SUCCESS: 'Upload thành công',
    UPLOAD_FAILED: 'Lỗi! Upload thất bại',

    UPDATE_STATUS_SUCCESS: 'Cập nhật thành công!', // Using only change status
    UPDATE_SUCCESS: 'Cập nhật thành công !',
    UPDATE_FAILED: 'Lỗi! Cập nhật thất bại !',

    DELETE_SUCCESS: 'Xoá thành công !',
    DELETE_FAILED: 'Lỗi! Xoá thất bại !'
  },

  FILE: {
    UPLOAD_REQUIRED: 'Vui lòng chọn ảnh',

    UPLOAD_TOO_LARGE: 'Oops! The file is too large!',
    UPLOAD_LESS_THAN: 'File size should be less than ',

    INVALID_FILE_TYPE: 'Only .jpg, .jpeg, .png and .webp formats are supported.'
  },

  AUTH: {
    POLICY_REQUIRED: 'Please review and accept our Policy before registering',
    LOGIN_REQUIRED: 'Please login before continue access this feature',

    REGISTER_SUCCESS:
      'Successfully ! Check inbox or spam on your email to continue verify',
    LOGIN_SUCCESS: 'Đăng nhập thành công',
    LOGOUT_SUCCESS: 'You have logged out successfully!',
    VERIFY_SUCCESS: 'Your email has been verified! You can now login',

    REGISTER_FAILED: 'Registering new account failed!',
    LOGIN_FAILED: 'Login failed! Incorrect email or password!',

    EMAIL_ACTIVED: 'Your email has already been activated!'
  },

  HTTP: {
    UNAUTHENTICATED: 'Please login first to access this page', // 401
    UNAUTHORIZE: "You don't have permission to access this page", // 403
    CONFLICT: 'This record already existed !', // 409
    FORBIDDEN: {
      // 403
      PAGE: "You don't have permission to access this page",
      FEATURE: "You don't have permission to access this feature"
    },
    NOT_FOUND: {
      // 404
      URL: "Oops! You've accessed the wrong URL.",
      RECORD: 'Oops! Your record does not existed !'
    },
    NOT_ALLOW: 'Method not allowed !', // 405
    BAD_REQUEST: 'Oops! Your request has a problem', // 400
    UNPROCESSABLE: 'Oops! Some data on your request not correct !', // 422
    MAINTENANCE: {
      // 503
      PAGE: 'Trang này đang trong giai đoạn phát triển',
      DEVELOP: 'Coming soon!'
    },

    // Prisma Error Throw:
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR' // 500
  },

  OTHER: {
    COPY_SUCCESS: 'Copy thành công vào bộ nhớ tạm!',
    COPY_FAILED: 'Failed to copy to clipboard'
  }
}
