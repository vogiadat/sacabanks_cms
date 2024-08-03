import { FormControl, FormHelperText, FormLabel, Option, Select, SelectTypeMap } from '@mui/joy'
import { InfoOutlined } from '@mui/icons-material'
import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { ReactNode } from 'react'

type Item = { value: string | number; label: ReactNode }

type Props<T extends FieldValues> = {
  label: string
  items: Item[]
  selectProps?: SelectTypeMap<Item['value']>['props']
  form: UseFormReturn<T, unknown, undefined>
  name: Path<T>
}

export const FormFieldSelect = <T extends FieldValues>({ label, items, selectProps, form, name }: Props<T>) => {
  const { control } = form

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onBlur, ref, onChange, value }, fieldState }) => {
        const error = fieldState.error?.message

        return (
          <FormControl error={!!error}>
            <FormLabel>{label}</FormLabel>
            <Select
              size='sm'
              placeholder='Filter'
              slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
              {...selectProps}
              ref={ref}
              onBlur={onBlur}
              value={value}
              onChange={(_, newValue) => {
                onChange(newValue)
              }}
            >
              {items.map((item) => (
                <Option value={item.value} key={item.value}>
                  {item.label}
                </Option>
              ))}
            </Select>
            {error && (
              <FormHelperText>
                <InfoOutlined />
                {error}
              </FormHelperText>
            )}
          </FormControl>
        )
      }}
    />
  )
}
