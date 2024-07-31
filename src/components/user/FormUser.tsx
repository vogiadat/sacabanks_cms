import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { RoleMap } from '@/types'

import { FormDrawer, FormFieldSelect, FormFieldInput, FormFieldInputPassword } from '@/components/form'
import { useEffect } from 'react'
import { formSchema, UserFormSchema } from './FormSchema'

interface Props {
  defaultValues: UserFormSchema
  open: boolean
  setOpen: (open: boolean) => void
  onSubmit: (_value: UserFormSchema) => void
  id?: string
  isLoading?: boolean
}

const FormUser = ({ defaultValues, open, setOpen, onSubmit, id = '', isLoading = false }: Props) => {
  const isEdit = id ? true : false
  const userRoleSelect = Object.entries(RoleMap).map(([key, value]) => ({
    value: key,
    label: value
  }))

  const form = useForm<UserFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues
  })

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
      <FormFieldInput
        label='Số điện thoại'
        inputProps={{ placeholder: 'Nhập số điện thoại' }}
        form={form}
        name='phoneNumber'
      />
      <FormFieldInput label='Địa chỉ' inputProps={{ placeholder: 'Nhập địa chỉ' }} form={form} name='address' />
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
    </FormDrawer>
  )
}

export default FormUser
