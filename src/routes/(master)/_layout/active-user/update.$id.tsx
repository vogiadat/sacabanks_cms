import { Box, Typography } from '@mui/joy'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import { createFileRoute } from '@tanstack/react-router'

import { activeUserApi } from '@/apis'
import { userApi } from '@/apis/user.api'
import { ActiveUserFormSchema } from '@/components/active-user'
import FormActiveUser from '@/components/active-user/FormActiveUser'
import { showToastError, showToastQuerySuccess } from '@/utils'
import { useMutation, useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/(master)/_layout/active-user/update/$id')({
  component: () => <Page />
})

function Page() {
  const { id } = Route.useParams()
  // console.log('🚀 ~ Page ~ id:', id)
  const { data } = useQuery({
    queryKey: activeUserApi.getKey('findById', { id }),
    queryFn: () => activeUserApi.findById(id)
  })

  const { isPending } = useMutation({
    mutationFn: (data: any) => userApi.create(data),
    onSuccess: showToastQuerySuccess('ADD_SUCCESS'),
    onError: showToastError
  })

  const resData = data?.data.data

  // console.log('🚀 ~ Page ~ activeUserData:', activeUserData)

  const handleSubmit = (_value: ActiveUserFormSchema) => {
    const dataSubmit: ActiveUserFormSchema = { ..._value, isActive: true }
    // mutate(dataSubmit)
    console.log(dataSubmit)
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
            {resData && (
              <FormActiveUser
                defaultValues={{
                  ...resData,
                  username: '',
                  phoneNumber: resData.phone,
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
