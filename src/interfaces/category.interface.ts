import { IBaseItem } from '@/interfaces'

export interface ICategoryItem extends IBaseItem {
  name: string
  image: string
  rank: number
  // ? Handle for case Edit not Res form API
  imageId?: string
}
