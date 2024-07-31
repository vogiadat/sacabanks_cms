import { APP_MESSAGE } from '@/constants'
import { generatePassword } from '@/utils'
import { Autorenew, InfoOutlined, Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, FormControl, FormHelperText, FormLabel, Input, InputTypeMap } from '@mui/joy'
import { useState } from 'react'
import { Controller, FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form'
import { toast } from 'sonner'

type Props<T extends FieldValues> = {
  label: string
  inputProps?: InputTypeMap['props']
  form: UseFormReturn<T, unknown, undefined>
  name: Path<T>
}

export const FormFieldInputPassword = <T extends FieldValues>({ inputProps, label, form, name }: Props<T>) => {
  const { control, setValue } = form
  const [showPassword, setShowPassword] = useState(false)

  const handleGeneratePassword = async () => {
    const generatedPassword = generatePassword()
    setValue(name, generatedPassword as PathValue<T, Path<T>>)
    await navigator.clipboard.writeText(generatedPassword)
    toast.success(APP_MESSAGE.OTHER.COPY_SUCCESS)
  }

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
              {...inputProps}
              ref={ref}
              onBlur={onBlur}
              value={value}
              type={!showPassword ? 'password' : 'text'}
              onChange={(e) => {
                onChange(e.target.value)
              }}
              endDecorator={
                <>
                  <Button variant='plain' onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </Button>
                  <Button
                    sx={{
                      width: 'fit-content'
                    }}
                    onClick={() => handleGeneratePassword()}
                    color='neutral'
                  >
                    <Autorenew />
                  </Button>
                </>
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
