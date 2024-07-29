import axios, { AxiosInstance } from 'axios'

import { APP_CONFIG, APP_MESSAGE } from '@/constants'
import { toast } from 'sonner'

const axiosClient: AxiosInstance = axios.create({
  baseURL: APP_CONFIG.BASE_URL.API,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export function showAxiosError(error: any) {
  if (error?.response && error.response?.data) {
    toast.error(error.response.data?.message)
  } else {
    toast.error(APP_MESSAGE.GENERAL.FAILED)
  }
}

export default axiosClient
