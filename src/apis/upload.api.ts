import { BaseApi } from '@/apis'

class UploadApi extends BaseApi<string, { file: File }> {
  constructor() {
    super('upload')
  }
}

export const uploadApi = new UploadApi()
