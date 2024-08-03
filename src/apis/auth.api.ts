import { LoginType, RegisterType } from '@/types'
import { axiosClient } from '@/utils'

export const authApi = {
  postRegister: async (data: RegisterType) =>
    await axiosClient.post('/auth/register', data),
  postLogin: async (data: LoginType) =>
    await axiosClient.post('/auth/login', data)
}
