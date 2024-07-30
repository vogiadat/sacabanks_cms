import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { RoleMap } from '@/types'

import FomFieldInput from '@/components/form/FomFieldInput'
import FormDrawer from '@/components/form/FormDrawer'
import FormFieldSelect from '@/components/form/FormFieldSelect'
import { useEffect } from 'react'
import { formSchema, UserForm } from './FormSchema'

interface Props {
  defaultValues: UserForm
  open: boolean
  setOpen: (open: boolean) => void
  onSubmit: (_value: UserForm) => void
  id?: string
  isLoading?: boolean
}

const FormUser = ({ defaultValues, open, setOpen, onSubmit, id = '', isLoading = false }: Props) => {
  const isEdit = id ? true : false
  const userRoleSelect = Object.entries(RoleMap).map(([key, value]) => ({
    value: key,
    label: value
  }))

  const form = useForm<UserForm>({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  // const { mutate: mutateDelete, isPending: isPendingDelete } = useMutation({
  //   mutationFn: (id: string) => categoryApi.delete(id),
  //   onSuccess: () => {
  //     queryClient.setQueryData(categoryApi.getKeyForList(), (oldData: any) => {
  //       // console.log('🚀 ~ queryClient.setQueryData ~ oldData:', oldData)
  //       return {
  //         ...oldData,
  //         data: {
  //           ...oldData.data,
  //           data: oldData.data.data.filter((item: ICategoryItem) => item.id !== id)
  //         }
  //       }
  //     })

  //     toast.success(APP_MESSAGE.FORM.DELETE_SUCCESS)
  //     // ? Reset data
  //     setDeleteModalOpen(false)
  //     handleCloseModal()
  //   }
  // })

  // const handleDelete = async () => {
  //   mutateDelete(id)
  // }

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
      isLoading={isLoading}
      isEdit={isEdit}
      id={id}
    >
      <FomFieldInput label='Email' inputProps={{ placeholder: 'Nhập email' }} form={form} name='email' />
      <FomFieldInput
        label='Số điện thoại'
        inputProps={{ placeholder: 'Nhập số điện thoại' }}
        form={form}
        name='phoneNumber'
      />
      <FomFieldInput label='Địa chỉ' inputProps={{ placeholder: 'Nhập địa chỉ' }} form={form} name='address' />
      <FomFieldInput
        label='Mật khẩu'
        inputProps={{ placeholder: 'Nhập mật khẩu', type: 'password' }}
        form={form}
        name='password'
      />
      <FormFieldSelect
        label='Quyền hạn'
        form={form}
        name='role'
        items={userRoleSelect}
        selectProps={{
          placeholder: 'Chọn nhóm quyền'
        }}
      />
    </FormDrawer>
  )
}

export default FormUser
