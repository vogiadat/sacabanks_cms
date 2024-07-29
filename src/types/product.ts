export interface Product {
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
  // listDetails: any[]
}

export interface Category {
  id: string
  createdAt: number
  updatedAt: number
  name: string
  image: null
  rank: null
}

export interface ListPhoto {
  id: string
  createdAt: number
  updatedAt: number
  photoUrl: string
  productId: string
}

export interface User {
  id: string
  createdAt: number
  updatedAt: number
  username: string
  email: string
  phoneNumber: string
  role: Role
  companyName: string
  address: string
  fullNameOwnerCompany: string
  companyGroup: string
  mainProductGroup: string
  numberProductService: string
  revenueEachYear: string
  description: string
  listCertificate: null
  listLinkProduct: null
  companyWishesCooperate: null
  linkProfile: null
  implementerName: null
  implementerPhone: null
  linkWebsite: null
  shortNameCompany: string
  avatar: string
  banner: null
  collab: string
  profits: string
}

export interface Role {
  id: string
  createdAt: null
  updatedAt: null
  name: string
}
