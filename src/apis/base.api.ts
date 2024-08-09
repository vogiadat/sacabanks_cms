/* eslint-disable @typescript-eslint/no-explicit-any */
import { ParamsType } from '@/types'
import { HeaderType } from '@/types/api.type'
import {
  axiosClient,
  AxiosResponseApi,
  AxiosResponsePagination,
  ResponseApi
} from '@/utils'
import { AxiosResponse, RawAxiosRequestHeaders } from 'axios'

// interface BaseApiConfig<T> {
//   endpoint: string
//   key: string45
// }
// ! Add api type here before call super('')
type EndpointType =
  | 'category'
  | 'upload'
  | 'user'
  | 'product'
  | 'register_vendor'
  | 'list_photo'
  | 'report'
  | 'blog'

type KeyType = 'getList' | 'getListPagination' | 'other' | 'findById'
type GeneralKeyDataType = {
  params?: ParamsType
  id?: string
}
export class BaseApi<TGet = any, TBody = any, TPatch = any, TDelete = any> {
  // ? Using in Constructor
  protected endpoint: string
  protected key: string
  // ? Using in children
  protected subKey: string = ''

  protected axiosClient = axiosClient

  constructor(endpoint: EndpointType) {
    this.endpoint = `/${endpoint}`
    this.key = endpoint
  }

  // * Getter & Setter
  setSubKey(subKey: string) {
    this.subKey = subKey
  }

  getKey(
    type: KeyType = 'getList',
    keyData?: GeneralKeyDataType,
    subKey?: string
  ) {
    let keyArrays: Array<KeyType | ParamsType | string | undefined> = []

    if (subKey) this.setSubKey(subKey)

    switch (type) {
      case 'getList':
        keyArrays = [
          this.key,
          type,
          ...this.convertParamsToArray(keyData?.params)
        ]
        break
      case 'getListPagination':
        keyArrays = [
          this.key,
          type,
          ...this.convertParamsToArray(keyData?.params)
        ]
        break
      case 'findById':
        keyArrays = [this.key, type, keyData?.id]
        break
      case 'other':
        keyArrays = [
          this.key,
          type,
          this.subKey,
          ...this.convertParamsToArray(keyData?.params)
        ]
        break
      default:
        break
    }

    return keyArrays
  }
  // * END Getter & Setter

  // * Main API Function
  getListPagination(
    params?: ParamsType
  ): Promise<AxiosResponsePagination<TGet>> {
    return this.axiosClient.get(`${this.endpoint}`, { params })
  }

  getList(params?: ParamsType): Promise<AxiosResponse<ResponseApi<TGet[]>>> {
    return this.axiosClient.get(`${this.endpoint}`, { params })
  }

  findById(id: string): Promise<AxiosResponseApi<TGet>> {
    return this.axiosClient.get(`${this.endpoint}/${id}`)
  }

  // * Mutation
  create(
    data: TBody,
    headerType?: HeaderType
  ): Promise<AxiosResponseApi<TGet>> {
    const headers = this.getHeaderRequest(headerType)
    return this.axiosClient.post(this.endpoint, data, {
      headers
    })
  }

  patch(
    id: string,
    data: TPatch,
    headerType?: HeaderType
  ): Promise<AxiosResponseApi<TGet>> {
    const headers = this.getHeaderRequest(headerType)

    return this.axiosClient.patch(`${this.endpoint}/${id}`, data, {
      headers
    })
  }

  delete(id: string): Promise<AxiosResponseApi<TDelete>> {
    return this.axiosClient.delete(`${this.endpoint}/${id}`)
  }
  // * END Main API Function

  // * General helper function
  protected convertParamsToArray(params?: ParamsType) {
    return params
      ? Object.entries(params).map(([key, value]) => `${key}_${value}`)
      : []
  }

  protected getHeaderRequest(headerType?: HeaderType): RawAxiosRequestHeaders {
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
}
