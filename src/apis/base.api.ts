import { HeaderType } from '@/types/api.type'
import { axiosClient, getHeaderRequest } from '@/utils'

// interface BaseApiConfig<T> {
//   endpoint: string
//   key: string
// }
// ! Add api type here before call super('')
type EndpointType = 'category'

export class BaseApi<T> {
  protected endpoint: string
  protected key: string

  constructor(endpoint: EndpointType) {
    this.endpoint = `/${endpoint}`
    this.key = endpoint
  }

  getKeyForList() {
    return [this.key, 'getList']
  }

  async getList() {
    return await axiosClient.get(`${this.endpoint}`)
  }

  getKeyForFindById(id: string) {
    return [this.key, 'findById', id]
  }

  async findById(id: string) {
    return await axiosClient.get(`${this.endpoint}/${id}`)
  }

  // * Mutation
  async create(data: T, headerType?: HeaderType) {
    const headers = getHeaderRequest(headerType)

    return await axiosClient.post(this.endpoint, data, {
      headers
    })
  }

  async delete(id: string) {
    return await axiosClient.delete(`${this.endpoint}/${id}`)
  }
}