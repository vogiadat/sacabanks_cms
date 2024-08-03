import { FilterType } from '@/types'
import { FormControl, FormLabel, Option, Select } from '@mui/joy'

const Filter = ({ name, items, selectProps, onChange }: FilterType) => {
  return (
    <FormControl>
      <FormLabel>{name}</FormLabel>
      <Select
        size='sm'
        placeholder='Filter'
        slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
        {...selectProps}
        onChange={(_, value) => {
          value && onChange(value)
        }}
        sx={{
          width: '150px'
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
