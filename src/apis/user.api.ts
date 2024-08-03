import { BaseApi } from '@/apis'
import { IUserItem } from '@/interfaces'
import { ResponseApi, axiosClient } from '@/utils'
import { AxiosResponse } from 'axios'

class UserApi extends BaseApi<IUserItem> {
  constructor() {
    super('user')
  }

  async getMe(): Promise<AxiosResponse<ResponseApi<IUserItem>>> {
    return axiosClient.get(`${this.endpoint}/me`)
  }
}

export const userApi = new UserApi()
