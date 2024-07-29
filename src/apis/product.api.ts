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
}

export const productApi = new ProductApi()
