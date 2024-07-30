import { BaseApi } from '@/apis'
import { IUserItem } from '@/interfaces'
import { axiosClient } from '@/utils'

class UserApi extends BaseApi<IUserItem> {
  constructor() {
    super('user')
  }

  getKeyForMe() {
    return [this.key, 'getMe']
  }

  async getMe() {
    return axiosClient.get(`${this.endpoint}/me`)
  }
}

export const userApi = new UserApi()
