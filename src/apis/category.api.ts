import { BaseApi } from '@/apis'
import { ICategoryItem } from '@/interfaces'
import { ResponseApi } from '@/utils'

class CategoryApi extends BaseApi<ResponseApi<ICategoryItem[]>> {
  constructor() {
    super('category')
  }
}

export const categoryApi = new CategoryApi()
