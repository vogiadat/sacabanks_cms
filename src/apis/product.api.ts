import { BaseApi } from '@/apis'
import { IProductItem } from '@/interfaces'
import { ParamsType } from '@/types'
import { axiosClient } from '@/utils'

class ProductApi extends BaseApi<IProductItem> {
  constructor() {
    super('product')
  }

  getMyProduct(params?: ParamsType) {
    return axiosClient.get(`${this.endpoint}/my_product`, {
      params
    })
  }
  getKeyForMyProduct(params?: ParamsType) {
    return [this.key, 'getListPagination', 'my_product', params]
  }

  getPublic(params?: ParamsType) {
    return axiosClient.get(`${this.endpoint}/public`, {
      params
    })
  }
  getKeyForPublic(params?: ParamsType) {
    return [this.key, 'getListPagination', 'public', params]
  }
}

export const productApi = new ProductApi()
