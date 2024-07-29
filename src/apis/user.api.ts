import { BaseApi } from '@/apis'
import { IUserItem } from '@/interfaces'
import { axiosClient } from '@/utils'

class UserApi extends BaseApi<IUserItem> {
  constructor() {
    super('user')
  }
}

export const userApi = new UserApi()
