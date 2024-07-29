import { BaseApi } from '@/apis'
import { IProductItem } from '@/interfaces/product.interface'

class ProductApi extends BaseApi<IProductItem> {
  constructor() {
    super('product')
  }
}

export const productApi = new ProductApi()
