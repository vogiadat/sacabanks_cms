import { FormControl, FormLabel, Option, Select, SelectTypeMap } from '@mui/joy'
import { ReactNode } from '@tanstack/react-router'

type Item = { value: string | number; label: ReactNode }

type Props = {
  name: string
  items: Item[]
  selectProps?: SelectTypeMap<Item['value']>['props']
  onChange: (value: Item['value']) => void
}

const Filter = ({ name, items, selectProps, onChange }: Props) => {
  return (
    <FormControl size='sm'>
      <FormLabel>{name}</FormLabel>
      <Select
        size='sm'
        placeholder='Filter'
        slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
        {...selectProps}
        onChange={(_, value) => {
          value && onChange(value)
        }}
      >
        {items.map((item) => (
          <Option value={item.value} key={item.value}>
            {item.label}
          </Option>
        ))}
      </Select>
    </FormControl>
  )
}

export default Filter
