/* eslint-disable @typescript-eslint/no-explicit-any */
import { ParamsType } from '@/types'
import { HeaderType } from '@/types/api.type'
import { axiosClient, AxiosResponseApi, AxiosResponsePagination, ResponseApi } from '@/utils'
import { AxiosResponse, RawAxiosRequestHeaders } from 'axios'

// interface BaseApiConfig<T> {
//   endpoint: string
//   key: string45
// }
// ! Add api type here before call super('')
type EndpointType = 'category' | 'upload' | 'user' | 'product' | 'register_vendor' | 'list_photo'

type KeyType = 'getList' | 'getListPagination' | 'findById'
type GeneralKeyDataType = {
  params?: ParamsType
  id?: string
}
export class BaseApi<TGet = any, TBody = any, TPatch = any, TDelete = any> {
  protected endpoint: string
  protected key: string

  constructor(endpoint: EndpointType) {
    this.endpoint = `/${endpoint}`
    this.key = endpoint
  }

  getKeyForListPagination(params?: ParamsType) {
    return [this.key, 'getListPagination', ...this.convertParamsToArray(params)]
  }

  getListPagination(params?: ParamsType): Promise<AxiosResponsePagination<TGet>> {
    return axiosClient.get(`${this.endpoint}`, { params })
  }

  getKeyForList(params?: ParamsType) {
    return [this.key, 'getList', ...this.convertParamsToArray(params)]
  }

  getList(params?: ParamsType): Promise<AxiosResponse<ResponseApi<TGet[]>>> {
    return axiosClient.get(`${this.endpoint}`, { params })
  }

  getKeyForFindById(id: string) {
    return [this.key, 'findById', id]
  }

  findById(id: string): Promise<AxiosResponseApi<TGet>> {
    return axiosClient.get(`${this.endpoint}/${id}`)
  }

  // * Mutation
  create(data: TBody, headerType?: HeaderType): Promise<AxiosResponseApi<TGet>> {
    const headers = this.getHeaderRequest(headerType)
    return axiosClient.post(this.endpoint, data, {
      headers
    })
  }

  patch(id: string, data: TPatch, headerType?: HeaderType): Promise<AxiosResponseApi<TGet>> {
    const headers = this.getHeaderRequest(headerType)

    return axiosClient.patch(`${this.endpoint}/${id}`, data, {
      headers
    })
  }

  delete(id: string): Promise<AxiosResponseApi<TDelete>> {
    return axiosClient.delete(`${this.endpoint}/${id}`)
  }

  // * General helper function
  protected convertParamsToArray(params?: ParamsType) {
    return params ? Object.entries(params) : []
  }

  protected getGeneralKey(type: KeyType = 'getList', keyData?: GeneralKeyDataType) {
    let keyArrays: Array<KeyType | ParamsType | string | undefined> = []

    switch (type) {
      case 'getList':
        keyArrays = [this.key, type, ...this.convertParamsToArray(keyData?.params)]
        break
      case 'getListPagination':
        keyArrays = [this.key, type, ...this.convertParamsToArray(keyData?.params)]
        break
      case 'findById':
        keyArrays = [this.key, type, keyData?.id]
        break
      default:
        break
    }

    return keyArrays
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
