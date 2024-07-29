export const IS_PRODUCTION = import.meta.env.NODE_ENV === 'production' ? true : false
console.log('🚀 ~ IS_PRODUCTION:', IS_PRODUCTION)

export const APP_CONFIG = {
  APP: {
    NAME: 'Sacabanks CMS',
    KEY_NAME: 'sacabanks_cms'
  },

  BASE_URL: {
    CLIENT: import.meta.env.VITE_BASE_CLIENT_URL ?? 'http://localhost:4000',
    API: import.meta.env.VITE_BASE_API_URL ?? 'http://localhost:8080/api'
  },

  AUTH: {
    LOCAL_STORAGE: {
      AUTH_STORE_KEY: IS_PRODUCTION ? 'asx@Dsdq%Y' : 'authStore'
    }
  }
}
