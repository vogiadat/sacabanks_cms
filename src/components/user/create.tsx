import { Add } from '@mui/icons-material'
import { Button } from '@mui/joy'
import React, { useEffect } from 'react'

import { userApi } from '@/apis/user.api'
import { getUsernameFromEmail, ShowToastError, showToastQuerySuccess } from '@/utils'
import { useMutation } from '@tanstack/react-query'
import { UserForm, defaultValues } from './FormSchema'
import FormUser from './FormUser'

const CreateUser = () => {
  const [open, setOpen] = React.useState(false)

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: any) => userApi.create(data),
    onSuccess: showToastQuerySuccess('ADD_SUCCESS'),
    onError: ShowToastError
  })

  const handleSubmit = async (_value: UserForm) => {
    const dataSubmit: UserForm = {
      username: getUsernameFromEmail(_value.email),
      email: _value.email,
      phoneNumber: _value.phoneNumber,
      password: _value.password,
      address: _value.address,
      role: _value.role
    }
    // console.log('🚀 ~ handleSubmit ~ dataSubmit:', dataSubmit)
    mutate(dataSubmit)
  }

  useEffect(() => {
    if (isSuccess && open) {
      setOpen(false)
    }
  }, [isSuccess])

  return (
    <>
      <Button color='primary' startDecorator={<Add />} size='sm' onClick={() => setOpen(true)}>
        Tạo mới
      </Button>
      <FormUser
        open={open}
        setOpen={setOpen}
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        isLoading={isPending}
      />
    </>
  )
}

export default CreateUser
