import { BaseApi } from '@/apis'
import { IProductItem } from '@/interfaces'
import { ParamsType } from '@/types'
import { AxiosResponsePagination, axiosClient } from '@/utils'

class ProductApi extends BaseApi<IProductItem> {
  constructor() {
    super('product')
  }

  getPublic(
    params?: ParamsType
  ): Promise<AxiosResponsePagination<IProductItem>> {
    return axiosClient.get(`${this.endpoint}/public`, {
      params
    })
  }

  getMyProduct(
    params?: ParamsType
  ): Promise<AxiosResponsePagination<IProductItem>> {
    return axiosClient.get(`${this.endpoint}/my_product`, {
      params
    })
  }
}

export const productApi = new ProductApi()
