import { Add } from '@mui/icons-material'
import { Button } from '@mui/joy'
import React from 'react'

import FormCategory from './FormCategory'
import { CategoryForm, defaultValues } from './FormSchema'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { categoryApi } from '@/apis/category.api'
import { APP_MESSAGE } from '@/constants'
import { toast } from 'sonner'
import { uploadApi } from '@/apis'

const Create = () => {
  const [open, setOpen] = React.useState(false)

  const queryClient = useQueryClient()

  const { mutate: uploadMutate, isPending: isUploadPending } = useMutation({
    mutationFn: (data: any) => uploadApi.create(data, 'multipart/form-data')
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => categoryApi.create(data),
    onSuccess: (newValue) => {
      const newCategory = newValue?.data.data
      toast.success(APP_MESSAGE.FORM.ADD_SUCCESS)
      queryClient.setQueryData(categoryApi.getKeyForList(), (oldData: any) => {
        if (!oldData || !oldData.data || !oldData.data.data) {
          return {
            data: {
              ...newCategory,
              data: [newCategory]
            }
          }
        }

        return {
          ...oldData,
          data: {
            ...oldData.data,
            data: [...oldData.data.data, newCategory]
          }
        }
      })
      setOpen(false)
    }
  })

  const handleSubmit = async (_value: CategoryForm) => {
    // console.log('🚀 ~ handleSubmit ~ _value:', _value)
    const uploadedFile: any = await new Promise((resolve, reject) => {
      uploadMutate(
        {
          file: _value.image
        },
        {
          onSuccess: (data) => resolve(data),
          onError: (error) => reject(error)
        }
      )
    })

    if (uploadedFile?.data.data) {
      mutate({
        ..._value,
        image: uploadedFile?.data.data
      })
    } else {
      toast.error(APP_MESSAGE.GENERAL.FAILED)
    }
  }

  const isLoading = isPending || isUploadPending ? true : false

  return (
    <>
      <Button color='primary' startDecorator={<Add />} size='sm' onClick={() => setOpen(true)}>
        Tạo mới
      </Button>
      <FormCategory
        open={open}
        setOpen={setOpen}
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </>
  )
}

export default Create
