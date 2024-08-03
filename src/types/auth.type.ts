import { RoleEnum } from '@/types/enum.type'

export type LoginResponseType = {
  accessToken: string | null
}

export type LoginType = {
  username: string
  password: string
}

export type RegisterType = {
  email: string
  phoneNumber: string
  username: string
  password: string
}

// *************************** Authorization ***************************
export const ALL_ROLE: RoleEnum[] = [
  RoleEnum.SUPPER_ADMIN,
  RoleEnum.CLIENT,
  RoleEnum.ADMIN,
  RoleEnum.VENDOR
]
export const ADMIN_SUPER_ADMIN_ROLE: RoleEnum[] = [
  RoleEnum.SUPPER_ADMIN,
  RoleEnum.ADMIN
]

// Auth Router
export const ALLOW_ROUTER_NOT_ADMIN = ['/', '/product', '/order']
// export const ALLOW_ROUTER_ADMIN = [
//   '/',
//   '/banner',
//   '/category',
//   '/product',
//   '/user',
//   '/supplier',
//   '/order',
//   '/active-user'
// ]
// ************************** END Authorization *************************
