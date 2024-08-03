import { Add } from '@mui/icons-material'
import { Button } from '@mui/joy'
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import React, { useEffect } from 'react'

import { userApi } from '@/apis/user.api'
import {
  getUsernameFromEmail,
  showToastError,
  showToastQuerySuccess
} from '@/utils'
import { UserFormSchema, defaultValues } from './FormSchema'
import FormUser from './FormUser'

const CreateUser = () => {
  const [open, setOpen] = React.useState(false)
  const queryClient = useQueryClient()

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: any) => userApi.create(data),
    onSuccess: (newValue) => {
      showToastQuerySuccess('ADD_SUCCESS')(newValue)
      queryClient.invalidateQueries(userApi.getKey() as InvalidateQueryFilters)
      setOpen(false)
    },
    onError: showToastError
  })

  const handleSubmit = async (_value: UserFormSchema) => {
    const dataSubmit: UserFormSchema = {
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
  }, [isSuccess, open])

  return (
    <>
      <Button
        color='primary'
        startDecorator={<Add />}
        size='sm'
        onClick={() => setOpen(true)}
      >
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
