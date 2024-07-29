import { IBaseItem } from '@/interfaces'

export interface IRoleItem extends IBaseItem {
  name: string
}

export interface IUserItem extends IBaseItem {
  username: string
  email: string
  phoneNumber: string
  role: IRoleItem
  companyName: string
  address: string
  fullNameOwnerCompany: string
  companyGroup: string
  mainProductGroup: string
  numberProductService: string
  revenueEachYear: string
  description: string
  listCertificate: string
  listLinkProduct: string
  companyWishesCooperate: string
  linkProfile: string
  implementerName: string
  implementerPhone: string
  linkWebsite: string
  shortNameCompany: string
  avatar: string
  banner: string
  collab: string
  profits: string
}
