/* eslint-disable @typescript-eslint/no-explicit-any */
import { SORT_SELECT } from '@/constants'
import { SortType } from '@/types'
import { useState } from 'react'

type FilterType = {
  [key: string]: any | undefined
}

export const useSearchFilter = () => {
  const [search, setSearch] = useState<string>('')
  const [filter, setFilter] = useState<FilterType>()
  const [sort, setSort] = useState<SortType>(SORT_SELECT[0].value)

  return {
    search,
    setSearch,
    filter,
    setFilter,
    sort,
    setSort
  }
}
