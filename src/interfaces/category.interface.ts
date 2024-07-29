import { IBaseItem } from '@/interfaces'

export interface ICategoryItem extends IBaseItem {
  name: string
  image: string
  rank: number
}
