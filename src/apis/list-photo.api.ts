import { BaseApi } from '@/apis'
import { ImageForm } from '@/components/images'
import { IListPhotoItem } from '@/interfaces'

class ListPhotoApi extends BaseApi<
  IListPhotoItem,
  ImageForm,
  ImageForm,
  IListPhotoItem
> {
  constructor() {
    super('list_photo')
  }
}

export const listPhotoApi = new ListPhotoApi()
