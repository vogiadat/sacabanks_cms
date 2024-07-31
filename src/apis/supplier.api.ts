import { BaseApi } from '@/apis'
import { UserForm } from '@/components/supplier/FormSchema'
import { IUserItem } from '@/interfaces'
import { RoleEnum } from '@/types'

class SupplierApi extends BaseApi<IUserItem, UserForm, UserForm, IUserItem> {
  constructor() {
    super('user')
  }

  createDefaultRole(data: UserForm) {
    data.role = RoleEnum.VENDOR
    return super.create(data)
  }
}

export const supplierApi = new SupplierApi()
