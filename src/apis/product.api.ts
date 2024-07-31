import { BaseApi } from '@/apis'
import { IProductItem } from '@/interfaces/product.interface'
import { ParamsType } from '@/types'
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

  async getPublic(params: ParamsType) {
    return await axiosClient.get(`${this.endpoint}/public`, {
      params
    })
  }
  getKeyForPublic(params: ParamsType) {
    return [this.key, 'getList', 'public', params]
  }
}

export const productApi = new ProductApi()
