import { AddAPhotoRounded } from '@mui/icons-material'
import { Box, FormControl, FormLabel, Typography } from '@mui/joy'
import { ChangeEventHandler } from 'react'
import {
  Controller,
  FieldValues,
  Path,
  PathValue,
  UseFormReturn
} from 'react-hook-form'
import VisuallyHiddenInput from '../../input/VisuallyHiddenInput'

type Props<T extends FieldValues> = {
  label?: string
  form: UseFormReturn<T, unknown, undefined>
  name: Path<T>
  defaultPreviewImage?: Path<T>
}

export const FormFieldImage = <T extends FieldValues>({
  label,
  form,
  name,
  defaultPreviewImage
}: Props<T>) => {
  const { control } = form

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { ref }, fieldState }) => {
        const error = fieldState.error?.message
        const previewFile = form.watch(defaultPreviewImage as Path<T>)

        const handleFileChange: ChangeEventHandler<HTMLInputElement> = (
          event
        ) => {
          const selectedFile = event.target?.files?.[0]
          console.log('🚀 ~ FormFieldImage ~ selectedFile:', selectedFile)

          if (selectedFile && selectedFile.type.startsWith('image/')) {
            const reader = new FileReader()
            reader.onload = (e) => {
              if (defaultPreviewImage && e.target?.result) {
                form.setValue(
                  defaultPreviewImage,
                  e.target.result.toString() as PathValue<T, Path<T>>
                )
                form.clearErrors(name)
              }
            }
            reader.readAsDataURL(selectedFile)

            event.target.value = ''

            return form.setValue(name, selectedFile as PathValue<T, Path<T>>)
          }
        }

        return (
          <FormControl>
            {label && <FormLabel>{label}</FormLabel>}
            <Box
              component={'label'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              minHeight={'200px'}
              position={'relative'}
              border={'1px dashed'}
              borderRadius={'10px'}
              sx={{
                borderColor: 'primary.300',
                cursor: 'pointer',
                padding: '12px'
              }}
            >
              {previewFile ? (
                <Box
                  sx={{
                    width: '100%',
                    height: '200px'
                  }}
                >
                  <img
                    srcSet={previewFile.toString()}
                    src={previewFile.toString()}
                    alt={'img'}
                    loading='lazy'
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '10px'
                    }}
                  />
                </Box>
              ) : (
                <Box position={'absolute'} zIndex={'10'}>
                  <AddAPhotoRounded />
                </Box>
              )}

              <VisuallyHiddenInput
                ref={ref}
                type='file'
                onChange={handleFileChange}
              />
            </Box>

            {error && (
              <Typography
                mt={1}
                fontSize={14}
                fontWeight={'400'}
                color='danger'
              >
                {error}
              </Typography>
            )}
          </FormControl>
        )
      }}
    />
  )
}
