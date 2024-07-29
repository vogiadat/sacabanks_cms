import { Add } from '@mui/icons-material'
import { Button } from '@mui/joy'
import React from 'react'

import FormCategory from './FormCategory'
import { CategoryForm, defaultValues } from './FormSchema'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { categoryApi } from '@/apis/category.api'
import { APP_MESSAGE } from '@/constants'
import { toast } from 'sonner'

const Create = () => {
  const [open, setOpen] = React.useState(false)

  const queryClient = useQueryClient()

  const { mutate, isSuccess, isPending, error } = useMutation({
    mutationFn: (data: any) => categoryApi.create(data, 'multipart/form-data'),
    onSuccess: (newCategory) => {
      console.log("🚀 ~ onSuccess ~ newCategory:", newCategory)
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

  const handleSubmit = (_value: CategoryForm) => {
    console.log('🚀 ~ handleSubmit ~ _value:', _value)
    mutate(_value)
  }

  return (
    <>
      <Button color='primary' startDecorator={<Add />} size='sm' onClick={() => setOpen(true)}>
        Tạo mới
      </Button>
      <FormCategory open={open} setOpen={setOpen} defaultValues={defaultValues} onSubmit={handleSubmit} />
    </>
  )
}

export default Create
