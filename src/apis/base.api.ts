/* eslint-disable @typescript-eslint/no-explicit-any */
import { ParamsType } from '@/types'
import { HeaderType } from '@/types/api.type'
import { axiosClient, AxiosResponseApi, AxiosResponsePagination, getHeaderRequest, ResponseApi } from '@/utils'
import { AxiosResponse } from 'axios'

// interface BaseApiConfig<T> {
//   endpoint: string
//   key: string45
// }
// ! Add api type here before call super('')
type EndpointType = 'category' | 'upload' | 'user' | 'product' | 'register_vendor'

export class BaseApi<TGet = any, TBody = any, TPatch = any, TDelete = any> {
  protected endpoint: string
  protected key: string

  constructor(endpoint: EndpointType) {
    this.endpoint = `/${endpoint}`
    this.key = endpoint
  }

  getKeyForList(params?: ParamsType) {
    return [this.key, 'getList', params]
  }

  getListPagination(params?: ParamsType): Promise<AxiosResponsePagination<TGet>> {
    return axiosClient.get(`${this.endpoint}`, { params })
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
    const headers = getHeaderRequest(headerType)
    return axiosClient.post(this.endpoint, data, {
      headers
    })
  }

  patch(id: string, data: TPatch, headerType?: HeaderType) {
    const headers = getHeaderRequest(headerType)

    return axiosClient.patch(`${this.endpoint}/${id}`, data, {
      headers
    })
  }

  delete(id: string): Promise<TDelete> {
    return axiosClient.delete(`${this.endpoint}/${id}`)
  }
}
