import { BaseApi } from '@/apis'
import { IProductItem } from '@/interfaces'
import { ParamsType } from '@/types'

class ProductApi extends BaseApi<IProductItem> {
  constructor() {
    super('product')
  }

  getMyProduct(params?: ParamsType) {
    this.endpoint = `${this.endpoint}/my_product`
    return super.getList(params)
  }
  getKeyForMyProduct() {
    return [this.key, 'getList', 'my_product']
  }

  getPublic(params?: ParamsType) {
    this.endpoint = `${this.endpoint}/public`
    return super.getList(params)
  }
  getKeyForPublic(params?: ParamsType) {
    return [this.key, 'getList', 'public', params]
  }
}

export const productApi = new ProductApi()
