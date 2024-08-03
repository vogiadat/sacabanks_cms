import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { RoleMap } from '@/types'

import { userApi } from '@/apis/user.api'
import {
  FormDrawer,
  FormFieldInput,
  FormFieldInputPassword,
  FormFieldSelect
} from '@/components/form'
import { showToastError, showToastQuerySuccess } from '@/utils'
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { ModalConfirmDelete } from '../modal'
import { formSchema, UserFormSchema } from './FormSchema'

interface Props {
  defaultValues: UserFormSchema
  open: boolean
  setOpen: (open: boolean) => void
  onSubmit: (_value: UserFormSchema) => void
  id?: string
  isLoading?: boolean
  userName?: string
}

const FormUser = ({
  defaultValues,
  open,
  setOpen,
  onSubmit,
  id = '',
  userName,
  isLoading = false
}: Props) => {
  const isEdit = id ? true : false
  const queryClient = useQueryClient()
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const userRoleSelect = Object.entries(RoleMap).map(([key, value]) => ({
    value: key,
    label: value
  }))

  const form = useForm<UserFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  const { mutate: mutateDelete, isPending: isPendingDelete } = useMutation({
    mutationFn: (id: string) => userApi.delete(id),
    onSuccess: (data) => {
      showToastQuerySuccess('DELETE_SUCCESS')(data)
      queryClient.invalidateQueries(userApi.getKey() as InvalidateQueryFilters)
      setDeleteModalOpen(false)
      handleCloseModal()
    },
    onError: showToastError
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
  }, [form, id, open])

  return (
    <FormDrawer
      open={open}
      onSubmit={onSubmit}
      onOpenModalConfirmDelete={() => setDeleteModalOpen(true)}
      form={form}
      onClose={handleCloseModal}
      isLoading={isLoading}
      isEdit={isEdit}
      id={id}
    >
      <FormFieldInput
        label='Email'
        inputProps={{ placeholder: 'Nhập email', disabled: isEdit }}
        form={form}
        name='email'
      />
      {isEdit && (
        <FormFieldInput
          label='Username'
          inputProps={{ placeholder: 'Nhập username', disabled: isEdit }}
          form={form}
          name='username'
        />
      )}
      <FormFieldInput
        label='Số điện thoại'
        inputProps={{ placeholder: 'Nhập số điện thoại' }}
        form={form}
        name='phoneNumber'
      />
      <FormFieldInput
        label='Địa chỉ'
        inputProps={{ placeholder: 'Nhập địa chỉ' }}
        form={form}
        name='address'
      />
      {isEdit ? (
        <></>
      ) : (
        <>
          <FormFieldInputPassword
            label='Mật khẩu'
            inputProps={{ placeholder: 'Nhập mật khẩu', type: 'password' }}
            form={form}
            name='password'
          />
        </>
      )}
      <FormFieldSelect
        label='Quyền hạn'
        form={form}
        name='role'
        items={userRoleSelect}
        selectProps={{
          placeholder: 'Chọn nhóm quyền'
        }}
      />
      <ModalConfirmDelete
        name={userName}
        isOpen={isDeleteModalOpen}
        isLoading={isLoading || isPendingDelete}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
    </FormDrawer>
  )
}

export default FormUser
