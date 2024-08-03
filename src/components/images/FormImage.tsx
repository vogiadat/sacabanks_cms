import { useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { categoryApi } from '@/apis'
import { APP_MESSAGE } from '@/constants'
import { ICategoryItem } from '@/interfaces'
import { CategoryType } from '@/types'

import { FormDrawer, FormFieldImage } from '@/components/form'
import { ModalConfirmDelete } from '@/components/modal'
import { ImageForm, formSchemaImage } from './FormSchemaImage'

interface Props {
  defaultValues: ImageForm
  open: boolean
  setOpen: (open: boolean) => void
  onSubmit: (_value: ImageForm) => void
  id?: string
  isLoading?: boolean
  category?: CategoryType
}

export const FormImage = ({
  defaultValues,
  open,
  setOpen,
  onSubmit,
  id = '',
  category,
  isLoading = false
}: Props) => {
  const queryClient = useQueryClient()

  const isEdit = id ? true : false
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)

  const form = useForm<ImageForm>({
    resolver: zodResolver(formSchemaImage),
    defaultValues
  })

  const { mutate: mutateDelete, isPending: isPendingDelete } = useMutation({
    mutationFn: (id: string) => categoryApi.delete(id),
    onSuccess: () => {
      queryClient.setQueryData(
        categoryApi.getKey('getList'),
        (oldData: any) => {
          // console.log('🚀 ~ queryClient.setQueryData ~ oldData:', oldData)
          return {
            ...oldData,
            data: {
              ...oldData.data,
              data: oldData.data.data.filter(
                (item: ICategoryItem) => item.id !== id
              )
            }
          }
        }
      )

      toast.success(APP_MESSAGE.FORM.DELETE_SUCCESS)
      // ? Reset data
      setDeleteModalOpen(false)
      handleCloseModal()
    }
  })

  const handleDelete = async () => {
    mutateDelete(id)
  }

  const handleCloseModal = () => {
    form.reset()
    setOpen(!open)
  }

  useEffect(() => {
    if (open && !id) {
      // ? Reset form for case create when open modal
      form.reset()
    }
  }, [open])

  return (
    <FormDrawer
      open={open}
      onSubmit={onSubmit}
      form={form}
      onClose={handleCloseModal}
      onOpenModalConfirmDelete={() => setDeleteModalOpen(true)}
      isLoading={isLoading}
      isEdit={isEdit}
      id={id}
    >
      <FormFieldImage
        form={form}
        name='image'
        label='Ảnh hiển thị'
        defaultPreviewImage={'photoUrl'}
      />
      {/* // ? Modal */}
      <ModalConfirmDelete
        name={category?.name}
        isOpen={isDeleteModalOpen}
        isLoading={isLoading || isPendingDelete}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
    </FormDrawer>
  )
}
