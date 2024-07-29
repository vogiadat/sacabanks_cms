export const APP_CONFIG = {
  APP: {
    NAME: 'Sacabanks CMS',
    KEY_NAME: 'sacabanks_cms'
  },

  BASE_URL: {
    CLIENT: import.meta.env.VITE_BASE_CLIENT_URL ?? 'http://localhost:4000',
    API: import.meta.env.VITE_BASE_API_URL ?? 'http://localhost:8080/api'
  }
}
