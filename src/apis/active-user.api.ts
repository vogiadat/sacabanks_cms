import { BaseApi } from '@/apis'
import { IUserItem } from '@/interfaces'

class ActiveUserApi extends BaseApi<IUserItem> {
  constructor() {
    super('register_vendor')
  }
}

export const activeUserApi = new ActiveUserApi()
