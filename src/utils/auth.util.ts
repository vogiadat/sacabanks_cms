import { APP_CONFIG } from '@/constants'
import { LoginResponseType } from '@/types'

export function checkAuthenticated(): boolean {
  const data = getAuthStore()
  return data?.accessToken ? true : false
}

export const getAuthStore = (): LoginResponseType | null => {
  if (typeof window !== 'object') return null

  const data = localStorage.getItem(
    APP_CONFIG.AUTH.LOCAL_STORAGE.AUTH_STORE_KEY
  )
  return data ? JSON.parse(data) : null
}

export const saveAuthStore = (authStoreValue: LoginResponseType): void => {
  if (typeof window !== 'object') return

  localStorage.setItem(
    APP_CONFIG.AUTH.LOCAL_STORAGE.AUTH_STORE_KEY,
    JSON.stringify(authStoreValue)
  )
}

export const removeAuthStore = (): void => {
  if (typeof window !== 'object') return

  localStorage.removeItem(APP_CONFIG.AUTH.LOCAL_STORAGE.AUTH_STORE_KEY)
}
