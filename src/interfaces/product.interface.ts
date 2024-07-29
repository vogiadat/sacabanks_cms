import { IBaseItem } from '@/interfaces'
import { Category } from '@/types'
import { ListPhoto, User } from '@/types/product'

export interface IProductItem extends IBaseItem {
  id: string
  createdAt: number
  updatedAt: number
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
  user: User
  category: Category
  listPhoto: ListPhoto[]
}
