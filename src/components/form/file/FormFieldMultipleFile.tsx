import VisuallyHiddenInput from '@/components/input/VisuallyHiddenInput'
import { AddAPhotoRounded } from '@mui/icons-material'
import { Box, FormControl, FormLabel, Typography } from '@mui/joy'
import { ChangeEventHandler } from 'react'
import { Controller, FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form'

type Props<T extends FieldValues> = {
  label?: string
  form: UseFormReturn<T, unknown, undefined>
  name: Path<T>
  defaultPreviewImages?: Path<T>
}

export const FormFieldMultipleImages = <T extends FieldValues>({
  label,
  form,
  name,
  defaultPreviewImages
}: Props<T>) => {
  const { control } = form

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { ref }, fieldState }) => {
        const error = fieldState.error?.message
        const previewFiles = form.watch(defaultPreviewImages as Path<T>) || []

        const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
          const selectedFiles = Array.from(event.target.files || [])

          const imageFiles = selectedFiles.filter((file) => file.type.startsWith('image/'))
          console.log('🚀 ~ imageFiles:', imageFiles)
          if (!imageFiles.length) return
          const newPreviewFiles = imageFiles.map((file) => {
            const reader = new FileReader()
            return new Promise<string>((resolve) => {
              reader.onload = (e) => {
                resolve(e.target?.result as string)
              }
              reader.readAsDataURL(file)
            })
          })

          Promise.all(newPreviewFiles).then((previewUrls) => {
            form.setValue(name, imageFiles as PathValue<T, Path<T>>)
            if (defaultPreviewImages) {
              form.setValue(defaultPreviewImages, previewUrls as PathValue<T, Path<T>>)
            }
          })
        }

        return (
          <FormControl>
            {label && <FormLabel>{label}</FormLabel>}
            <Box
              component={'label'}
              display={'flex'}
              flexWrap={'wrap'}
              justifyContent={'center'}
              alignItems={'center'}
              minHeight={'200px'}
              position={'relative'}
              border={'1px dashed'}
              borderRadius={'10px'}
              sx={{
                borderColor: 'primary.300',
                cursor: 'pointer',
                overflow: 'hidden'
              }}
            >
              {previewFiles.length > 0 ? (
                previewFiles.map((file: any, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: 'calc(33% - 10px)',
                      height: '100px',
                      margin: '5px'
                    }}
                  >
                    <img
                      srcSet={file.toString()}
                      src={file.toString()}
                      alt={`preview-${index}`}
                      loading='lazy'
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '10px'
                      }}
                    />
                  </Box>
                ))
              ) : (
                <Box position={'absolute'} zIndex={'10'}>
                  <AddAPhotoRounded />
                </Box>
              )}

              <VisuallyHiddenInput ref={ref} type='file' multiple onChange={handleFileChange} />
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
