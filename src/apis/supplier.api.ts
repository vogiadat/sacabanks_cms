import { BaseApi } from '@/apis'
import { UserForm } from '@/components/supplier/FormSchema'
import { IUserItem, UserResponseItem, UserResponsePagination } from '@/interfaces'
import { RoleEnum } from '@/types'
import { AxiosResponse } from 'axios'

class SupplierApi extends BaseApi<UserResponseItem, UserForm, UserForm, IUserItem> {
  constructor() {
    super('user')
  }

  createDefaultRole(data: UserForm): Promise<AxiosResponse<UserResponseItem>> {
    data.role = RoleEnum.VENDOR
    return super.create(data)
  }

  getList(): Promise<AxiosResponse<UserResponsePagination>> {
    return super.getList()
  }
}

export const supplierApi = new SupplierApi()
