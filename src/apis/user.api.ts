import { BaseApi } from '@/apis'
import { IUserItem } from '@/interfaces'

class UserApi extends BaseApi<IUserItem> {
  constructor() {
    super('user')
  }
}

export const userApi = new UserApi()
