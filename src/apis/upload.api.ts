import { BaseApi } from '@/apis'
import { ICategoryItem } from '@/interfaces'

class UploadApi extends BaseApi<ICategoryItem> {
  constructor() {
    super('upload')
  }
}

export const uploadApi = new UploadApi()
