import { InfoOutlined, Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, FormControl, FormHelperText, FormLabel, Input, InputTypeMap } from '@mui/joy'
import { useState } from 'react'
import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form'

type Props<T extends FieldValues> = {
  label: string
  inputProps?: InputTypeMap['props']
  form: UseFormReturn<T, unknown, undefined>
  name: Path<T>
}

const FomFieldInput = <T extends FieldValues>({ inputProps, label, form, name }: Props<T>) => {
  const { control } = form
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onBlur, ref, onChange, value }, fieldState }) => {
        const isPasswordField = inputProps?.type === 'password'
        const error = fieldState.error?.message

        return (
          <FormControl error={!!error}>
            <FormLabel>{label}</FormLabel>
            <Input
              {...inputProps}
              ref={ref}
              onBlur={onBlur}
              value={value}
              type={isPasswordField && !showPassword ? 'password' : 'text'}
              onChange={(e) => {
                onChange(e.target.value)
              }}
              endDecorator={
                isPasswordField && (
                  <Button variant='plain' onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </Button>
                )
              }
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

export default FomFieldInput
