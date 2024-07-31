import { ParamsType } from '@/types'
import { HeaderType } from '@/types/api.type'
import { axiosClient, getHeaderRequest } from '@/utils'

// ! Add api type here before call super('')
type EndpointType = 'category' | 'upload' | 'user' | 'product' | 'register_vendor'

export class BaseApi<T> {
  protected endpoint: string
  protected key: string

  constructor(endpoint: EndpointType) {
    this.endpoint = `/${endpoint}`
    this.key = endpoint
  }

  getKeyForList(params?: ParamsType) {
    return [this.key, 'getList', params]
  }
  async getList(params?: ParamsType) {
    return await axiosClient.get(`${this.endpoint}`, {
      params
    })
  }

  getKeyForFindById(id: string) {
    return [this.key, 'findById', id]
  }
  async findById(id: string) {
    return await axiosClient.get(`${this.endpoint}/${id}`)
  }

  // * Mutation
  async create(data: any, headerType?: HeaderType) {
    const headers = getHeaderRequest(headerType)

    return await axiosClient.post(this.endpoint, data, {
      headers
    })
  }

  async oldCreate(data: T, headerType?: HeaderType) {
    const headers = getHeaderRequest(headerType)

    return await axiosClient.post(this.endpoint, data, {
      headers
    })
  }

  async patch(id: string, data: any, headerType?: HeaderType) {
    const headers = getHeaderRequest(headerType)

    return await axiosClient.patch(`${this.endpoint}/${id}`, data, {
      headers
    })
  }

  async delete(id: string) {
    return await axiosClient.delete(`${this.endpoint}/${id}`)
  }
}
