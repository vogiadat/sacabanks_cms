import { supplierApi, uploadApi } from '@/apis'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createFileRoute, useRouter } from '@tanstack/react-router'

import { UserForm } from '@/components/supplier/FormSchema'
import FormSupplier from '@/components/supplier/FormSupplier'
import { RoleEnum } from '@/types'
import { getImageById, showToastError, showToastQuerySuccess } from '@/utils'
import { Box, Card, CardContent, Typography } from '@mui/joy'
export const Route = createFileRoute('/(master)/_layout/supplier/update/$id')({
  component: Page
})

function Page() {
  const { id } = Route.useParams()
  const { navigate } = useRouter()

  const { isPending: loadingFile, mutateAsync: upload } = useMutation({
    mutationFn: (data: { file: File }) => uploadApi.create(data, 'multipart/form-data')
  })

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: { id: string } & UserForm) => supplierApi.patch(id, data)
  })

  const { data, isFetching: isLoadingData } = useQuery({
    queryKey: supplierApi.getKeyForFindById(id),
    queryFn: () => supplierApi.findById(id)
  })
  // console.log({ id, isLoadingData })

  const supplier = data?.data.data

  const handleSubmit = async (_value: UserForm) => {
    _value.avatar = supplier?.avatar
    _value.banner = supplier?.banner

    if (_value.avatarFile) {
      await upload({ file: _value.avatarFile })
        .then((res) => (_value.avatar = res.data.data))
        .catch(showToastError)
    }

    if (_value.bannerFile) {
      await upload({ file: _value.bannerFile })
        .then((res) => (_value.banner = res.data.data))
        .catch(showToastError)
    }

    await mutateAsync({ ..._value, id })
      .then((data) => {
        showToastQuerySuccess('UPDATE_SUCCESS')(data)
        navigate({ to: '/supplier' })
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
          Chi Tiết Nhà Cung Cấp
        </Typography>
      </Box>

      <Box
        className='custom-scrollbar'
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
            {supplier && (
              <FormSupplier
                defaultValues={{
                  ...supplier,
                  password: null,
                  role: RoleEnum.VENDOR,
                  avatar: getImageById(supplier.avatar),
                  banner: getImageById(supplier.banner)
                }}
                onSubmit={handleSubmit}
                isLoading={isLoadingData || isPending || loadingFile}
              />
            )}
          </CardContent>
        </Card>
      </Box>
    </>
  )
}
