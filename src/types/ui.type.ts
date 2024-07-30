import { SelectTypeMap } from '@mui/joy'
import { ReactNode } from 'react'

type Item = { value: string | number; label: ReactNode }

export type FilterType = {
  name: string
  items: Item[]
  selectProps?: SelectTypeMap<Item['value']>['props']
  onChange: (value: Item['value']) => void
}
