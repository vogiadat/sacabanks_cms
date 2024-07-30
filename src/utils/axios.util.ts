import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'

import { APP_CONFIG, APP_MESSAGE } from '@/constants'
import { getAuthStore } from '@/utils'
import { toast } from 'sonner'

const axiosClient: AxiosInstance = axios.create({
  baseURL: APP_CONFIG.BASE_URL.API,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosClient.interceptors.request.use(
  (config) => {
    const authStore = getAuthStore()

    if (authStore?.accessToken) {
      config.headers.Authorization = `Bearer ${authStore?.accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    // const prevReq = error.config
    return Promise.reject(error)
  }
)

export function showAxiosError(error: any) {
  if (error?.response && error.response?.data) {
    toast.error(error.response.data?.message)
  } else {
    toast.error(APP_MESSAGE.GENERAL.FAILED)
  }
}

export const showToastQuerySuccess =
  (type: 'ADD_SUCCESS' | 'UPDATE_SUCCESS' | 'DELETE_SUCCESS') => (response: AxiosResponse) => {
    const data = response?.data?.data
    if (data) {
      toast.success(APP_MESSAGE.FORM[type])
    }
  }

export function ShowToastError(error: Error) {
  if (error instanceof AxiosError && error?.response && error.response?.data) {
    return toast.error(error.response.data?.message)
  }
  toast.error(APP_MESSAGE.GENERAL.FAILED)
}

export default axiosClient
