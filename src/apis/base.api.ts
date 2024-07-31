/* eslint-disable @typescript-eslint/no-explicit-any */
import { HeaderType } from '@/types/api.type'
import { axiosClient, getHeaderRequest } from '@/utils'
import { AxiosResponse } from 'axios'

// interface BaseApiConfig<T> {
//   endpoint: string
//   key: string45
// }
// ! Add api type here before call super('')
type EndpointType = 'category' | 'upload' | 'user' | 'product'

export class BaseApi<TGet = any, TBody = any, TPatch = any, TDelete = any> {
  protected endpoint: string
  protected key: string

  constructor(endpoint: EndpointType) {
    this.endpoint = `/${endpoint}`
    this.key = endpoint
  }

  getKeyForList() {
    return [this.key, 'getList']
  }

  getList(): Promise<AxiosResponse<any>> {
    return axiosClient.get(`${this.endpoint}`)
  }

  getKeyForFindById(id: string) {
    return [this.key, 'findById', id]
  }

  findById(id: string): Promise<AxiosResponse<TGet>> {
    return axiosClient.get(`${this.endpoint}/${id}`)
  }

  // * Mutation
  create(data: TBody, headerType?: HeaderType): Promise<AxiosResponse<TGet>> {
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
