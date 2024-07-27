import { AddAPhotoRounded } from '@mui/icons-material'
import { Box, FormControl, FormLabel, Typography } from '@mui/joy'
import { ChangeEventHandler, useState } from 'react'
import { Controller, FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form'
import VisuallyHiddenInput from '../input/VisuallyHiddenInput'

type Props<T extends FieldValues> = {
  label?: string
  form: UseFormReturn<T, unknown, undefined>
  name: Path<T>
  defaultPreviewImage?: string
}

const FormFieldImage = <T extends FieldValues>({ label, form, name, defaultPreviewImage }: Props<T>) => {
  const { control } = form
  const [previewFile, setPreviewFile] = useState<string | ArrayBuffer | null | undefined>(defaultPreviewImage)

  console.log({ defaultPreviewImage })

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { ref }, fieldState }) => {
        const error = fieldState.error?.message

        const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
          const selectedFile = event.target?.files?.[0]

          if (selectedFile && selectedFile.type.startsWith('image/')) {
            const reader = new FileReader()
            reader.onload = (e) => setPreviewFile(e.target?.result || null)
            reader.readAsDataURL(selectedFile)
            return form.setValue(name, selectedFile as PathValue<T, Path<T>>)
          }

          setPreviewFile(null)
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
                cursor: 'pointer'
              }}
            >
              <Box position={'absolute'} zIndex={'10'}>
                <AddAPhotoRounded />
              </Box>

              {previewFile && (
                <img
                  srcSet={previewFile.toString()}
                  src={previewFile.toString()}
                  alt={'img'}
                  loading='lazy'
                  style={{
                    width: '100%'
                  }}
                />
              )}

              <VisuallyHiddenInput ref={ref} type='file' onChange={handleFileChange} />
            </Box>

            {error && (
              <Typography mt={1} fontSize={14} fontWeight={'400'} color='danger'>
                {error}
              </Typography>
            )}
          </FormControl>
        )
      }}
    />
  )
}

export default FormFieldImage
