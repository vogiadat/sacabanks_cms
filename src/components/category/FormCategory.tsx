import { useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { categoryApi } from '@/apis'
import { APP_MESSAGE } from '@/constants'
import { ICategoryItem } from '@/interfaces'
import { Category } from '@/types'

import FomFieldInput from '@/components/form/FomFieldInput'
import FormDrawer from '@/components/form/FormDrawer'
import FormFieldImage from '@/components/form/FormFieldFile'
import { ModalConfirmDelete } from '@/components/modal'
import { CategoryForm, formSchema } from './FormSchema'

interface Props {
  defaultValues: CategoryForm
  open: boolean
  setOpen: (open: boolean) => void
  onSubmit: (_value: CategoryForm) => void
  id?: string
  isLoading?: boolean
  category?: Category
}

const FormCategory = ({ defaultValues, open, setOpen, onSubmit, id = '', category, isLoading = false }: Props) => {
  const queryClient = useQueryClient()

  const isEdit = id ? true : false
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)

  const form = useForm<CategoryForm>({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  const {
    mutate: mutateDelete,
    isSuccess: isSuccessDelete,
    isPending: isPendingDelete,
    error: errorDelete
  } = useMutation({
    mutationFn: (id: string) => categoryApi.delete(id),
    onSuccess: (res) => {
      queryClient.setQueryData(categoryApi.getKeyForList(), (oldData: any) => {
        console.log('🚀 ~ queryClient.setQueryData ~ oldData:', oldData)
        return {
          ...oldData,
          data: {
            ...oldData.data,
            data: oldData.data.data.filter((item: ICategoryItem) => item.id !== id)
          }
        }
      })

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
      <FomFieldInput label='Tên hiển thị' inputProps={{ placeholder: 'nhập tên hiển thị' }} form={form} name='name' />
      <FormFieldImage form={form} name='image' label='Ảnh hiển thị' defaultPreviewImage={defaultValues.previewImage} />
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

export default FormCategory
