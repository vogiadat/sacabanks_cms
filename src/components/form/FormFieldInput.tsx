import { InfoOutlined } from '@mui/icons-material'
import { FormControl, FormHelperText, FormLabel, Input, InputTypeMap } from '@mui/joy'
import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form'

type Props<T extends FieldValues> = {
  label: string
  inputProps?: InputTypeMap['props']
  form: UseFormReturn<T, unknown, undefined>
  name: Path<T>
}

export const FormFieldInput = <T extends FieldValues>({ inputProps, label, form, name }: Props<T>) => {
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
            <Input
              ref={ref}
              onBlur={onBlur}
              value={value || undefined}
              type={'text'}
              onChange={(e) => {
                onChange(e.target.value)
              }}
              {...inputProps}
            />
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
