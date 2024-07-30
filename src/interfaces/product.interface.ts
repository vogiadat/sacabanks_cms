import { IBaseItem, ICategoryItem, IUserItem, IListPhotoItem } from '@/interfaces'

export interface IProductItem extends IBaseItem {
  title: string
  slug: string
  itemNumber: string
  material: string
  finishing: string
  dimensionL: number
  dimensionW: number
  dimensionH: number
  netWeight: number
  price: null
  quantity: null
  mainPhoto: string
  tags: string
  desc: null
  user: IUserItem
  category: ICategoryItem
  listPhoto: IListPhotoItem[]
  // listDetails: any[]
}
