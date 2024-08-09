import { InfoOutlined } from '@mui/icons-material'
import { FormControl, FormHelperText, FormLabel } from '@mui/joy'
import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form'
import TextEditor from '../base/TextEditor'

type Props<T extends FieldValues> = {
  label: string
  form: UseFormReturn<T, unknown, undefined>
  name: Path<T>
}

export const FormFieldTextEditor = <T extends FieldValues>({
  label,
  form,
  name
}: Props<T>) => {
  const { control } = form

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState }) => {
        const error = fieldState.error?.message

        return (
          <FormControl error={!!error}>
            <FormLabel sx={{ typography: 'h3' }}>{label}</FormLabel>
            <TextEditor
              value={value}
              onValueChange={(value) => {
                onChange(value)
              }}
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
