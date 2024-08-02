import { Add } from '@mui/icons-material'
import { Button } from '@mui/joy'
import React from 'react'

import { FormImage } from './FormImage'
import { ImageForm, defaultValues } from './FormSchemaImage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { categoryApi } from '@/apis/category.api'
import { APP_MESSAGE } from '@/constants'
import { toast } from 'sonner'
import { productApi, uploadApi } from '@/apis'
import { listPhotoApi } from '@/apis/list-photo.api'
import { showToastError, showToastQuerySuccess } from '@/utils'

interface Props {
  productId: string
}

export const CreateImage = ({ productId }: Props) => {
  console.log('🚀 ~ CreateImage ~ productId:', productId)
  const [open, setOpen] = React.useState(false)

  const queryClient = useQueryClient()

  const { mutateAsync: uploadMutate, isPending: isUploadPending } = useMutation({
    mutationFn: (data: { file: File }) => uploadApi.create(data, 'multipart/form-data')
  })

  const { mutateAsync: mutateListPhoto, isPending: isPendingListPhoto } = useMutation({
    mutationFn: (data: ImageForm) => listPhotoApi.create(data)
  })

  const handleSubmit = async (_value: ImageForm) => {
    try {
      const uploadedFile = await uploadMutate({
        file: _value.image!
      })

      await mutateListPhoto({
        ..._value,
        photoUrl: uploadedFile.data.data
      }).then(showToastQuerySuccess("UPLOAD_SUCCESS"))


      queryClient.invalidateQueries({
        queryKey: productApi.getKeyForFindById(productId),
        exact: true
      })
      
      setOpen(false)
    } catch (error) {
      showToastError(error as Error)
    }
  }

  const isLoading = isPendingListPhoto || isUploadPending ? true : false

  return (
    <>
      <Button color='primary' startDecorator={<Add />} size='sm' onClick={() => setOpen(true)}>
        Tạo mới
      </Button>
      <FormImage
        open={open}
        setOpen={setOpen}
        defaultValues={{
          productId
        }}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </>
  )
}
