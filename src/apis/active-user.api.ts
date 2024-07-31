import { BaseApi } from '@/apis'
import { IActiveUserItem } from '@/interfaces'

class ActiveUserApi extends BaseApi<IActiveUserItem> {
  constructor() {
    super('register_vendor')
  }
}

export const activeUserApi = new ActiveUserApi()
