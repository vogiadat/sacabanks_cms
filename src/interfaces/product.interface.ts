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
  price: number | null
  quantity: number | null
  mainPhoto: string
  tags: string | null
  desc: string | null
  user: IUserItem
  category: ICategoryItem
  listPhoto: IListPhotoItem[]
  listDetails: IListDetailItem[]
}

interface IListDetailItem {
  name: string
  desc: string
}
