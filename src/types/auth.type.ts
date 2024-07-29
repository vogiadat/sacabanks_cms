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
