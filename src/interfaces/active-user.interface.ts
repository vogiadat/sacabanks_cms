import { IUserItem } from '@/interfaces'

export interface IActiveUserItem
  extends Omit<IUserItem, 'username' | 'role' | 'phoneNumber'> {
  isActive: boolean
  phone: string
}
