import { BaseApi } from '@/apis'
import { ICategoryItem } from '@/interfaces'

class CategoryApi extends BaseApi<ICategoryItem> {
  constructor() {
    super('category')
  }
}

export const categoryApi = new CategoryApi()
