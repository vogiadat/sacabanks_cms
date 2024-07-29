import { HeaderType } from '@/types'
import { RawAxiosRequestHeaders } from 'axios'

export const getHeaderRequest = (headerType?: HeaderType): RawAxiosRequestHeaders => {
  let headers = {}
  switch (headerType) {
    case 'multipart/form-data':
      headers = {
        ...headers,
        'Content-Type': 'multipart/form-data'
      }
      break
    default:
      break
  }

  return headers
}
