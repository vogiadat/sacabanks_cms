import { BaseApi } from '@/apis'
import { IProductItem } from '@/interfaces'
import { ParamsType } from '@/types'
import { axiosClient } from '@/utils'

class ProductApi extends BaseApi<IProductItem> {
  constructor() {
    super('product')
  }

  getPublic(params?: ParamsType) {
    return axiosClient.get(`${this.endpoint}/public`, {
      params
    })
  }
}

export const productApi = new ProductApi()
