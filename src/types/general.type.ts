export type StringNullType = string | null

export type PaginationType = {
  currentPage: number
  totalPages: number
  totalItems: number
  totalLoadItems: number
}

export type ParamsType = {
  page?: number
  limit?: number
  search?: string
  [key: string]: any | undefined
}

export type SortType = 'ASC' | 'DESC'
export type SortSelectType = {
  value: SortType
  label: string
}
