import { InfoOutlined } from '@mui/icons-material'
import { FormControl, FormHelperText, FormLabel, Textarea, TextareaTypeMap } from '@mui/joy'
import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form'

type Props<T extends FieldValues> = {
  label: string
  textAreaProps?: TextareaTypeMap['props']
  form: UseFormReturn<T, unknown, undefined>
  name: Path<T>
}

const FormTextArea = <T extends FieldValues>({ textAreaProps, label, form, name }: Props<T>) => {
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
            <Textarea
              {...textAreaProps}
              ref={ref}
              value={value}
              onBlur={onBlur}
              onChange={(e) => {
                onChange(e.target.value)
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

export default FormTextArea
