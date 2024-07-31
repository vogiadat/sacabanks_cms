export type StringNullType = string | null

export type PaginationType = {
  currentPage: number
  totalPages: number
  totalItems: number
  totalLoadItems: number
}

export type ParamsType = {
  page?: number
  search?: string
  [key: string]: any | undefined
}
