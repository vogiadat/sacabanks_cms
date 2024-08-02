import { BaseApi } from '@/apis'
import { IProductItem } from '@/interfaces'
import { ParamsType } from '@/types'

class ProductApi extends BaseApi<IProductItem> {
  constructor() {
    super('product')
  }

  getMyProduct(params?: ParamsType) {
    this.endpoint = `/${this.key}/my_product`
    return super.getListPagination(params)
  }
  getKeyForMyProduct(params?: ParamsType) {
    return [this.key, 'getListPagination', 'my_product', params]
  }

  getPublic(params?: ParamsType) {
    this.endpoint = `/${this.key}/public`
    return super.getListPagination(params)
  }
  getKeyForPublic(params?: ParamsType) {
    return [this.key, 'getListPagination', 'public', params]
  }
}

export const productApi = new ProductApi()
