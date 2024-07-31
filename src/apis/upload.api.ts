import { BaseApi } from '@/apis'
import { ResponseApi } from '@/utils'

class UploadApi extends BaseApi<ResponseApi<string>, { file: File }> {
  constructor() {
    super('upload')
  }
}

export const uploadApi = new UploadApi()
