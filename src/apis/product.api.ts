import { BaseApi } from '@/apis'
import { IProductItem } from '@/interfaces/product.interface'
import { axiosClient } from '@/utils'

class ProductApi extends BaseApi<IProductItem> {
  constructor() {
    super('product')
  }

  async getMyProduct() {
    return await axiosClient.get(`${this.endpoint}/my_product`)
  }
  getKeyForMyProduct() {
    return [this.key, 'getList', 'my_product']
  }

  async getPublic(page: number = 1) {
    return await axiosClient.get(`${this.endpoint}/public`, {
      params: { page }
    })
  }
  getKeyForPublic(page: number = 1) {
    return [this.key, 'getList', 'public', `page_${page}`]
  }
}

export const productApi = new ProductApi()
