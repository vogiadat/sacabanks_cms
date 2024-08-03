import { Box, Typography } from '@mui/joy'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { activeUserApi, supplierApi } from '@/apis'
import FormActiveUser from '@/components/active-user/FormActiveUser'
import {
  getUsernameFromEmail,
  showToastError,
  showToastQuerySuccess
} from '@/utils'
import { useMutation, useQuery } from '@tanstack/react-query'
import { UserForm } from '@/components/supplier/FormSchema'
import { RoleEnum } from '@/types'

export const Route = createFileRoute(
  '/(master)/_layout/active-user/update/$id'
)({
  component: () => <Page />
})

function Page() {
  const navigate = useNavigate()
  const { id } = Route.useParams()
  // console.log('🚀 ~ Page ~ id:', id)
  const { data } = useQuery({
    queryKey: activeUserApi.getKey('findById', { id }),
    queryFn: () => activeUserApi.findById(id)
  })

  const { mutateAsync: mutateAsyncDelete } = useMutation({
    mutationFn: (id: string) => activeUserApi.delete(id)
  })

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: UserForm) => supplierApi.createDefaultRole(data)
  })

  const formData = data?.data.data

  const handleSubmit = async (_value: UserForm) => {
    await mutateAsync(_value)
      .then((data) => {
        showToastQuerySuccess('ADD_SUCCESS')(data)
        mutateAsyncDelete(id)
          .then(() => navigate({ to: '/supplier' }))
          .catch((error) => {
            throw error
          })
      })
      .catch(showToastError)
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          mb: 1,
          gap: 1,
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'start', sm: 'center' },
          flexWrap: 'wrap',
          justifyContent: 'space-between'
        }}
      >
        <Typography level='h2' component='h1'>
          Đơn Tham Gia
        </Typography>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          m: -1,
          overflowX: 'hidden'
        }}
      >
        <Card>
          <div>
            <Typography level='title-lg'>Thông tin cơ bản</Typography>
          </div>
          <CardContent>
            {formData && (
              <FormActiveUser
                defaultValues={{
                  ...formData,
                  username: getUsernameFromEmail(formData.email),
                  role: RoleEnum.VENDOR,
                  phoneNumber: formData.phone,
                  password: null
                }}
                onSubmit={handleSubmit}
                isLoading={isPending}
              />
            )}
          </CardContent>
        </Card>
      </Box>
    </>
  )
}
