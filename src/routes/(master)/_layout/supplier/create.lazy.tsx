import { supplierApi, uploadApi } from '@/apis'
import { initUserForm, UserForm } from '@/components/supplier/FormSchema'
import FormSupplier from '@/components/supplier/FormSupplier'
import { showToastError, showToastQuerySuccess } from '@/utils'
import { Box, Card, CardContent, Typography } from '@mui/joy'
import { useMutation } from '@tanstack/react-query'
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(master)/_layout/supplier/create')({
  component: Page
})

function Page() {
  const navigate = useNavigate()

  const { isPending: loadingFile, mutateAsync: upload } = useMutation({
    mutationFn: (data: { file: File }) => uploadApi.create(data, 'multipart/form-data')
  })
  const { mutateAsync, isPending: loadingSubmit } = useMutation({
    mutationFn: (data: UserForm) => supplierApi.createDefaultRole(data)
  })

  const handleSubmit = async (_value: UserForm) => {
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

    await mutateAsync(_value)
      .then((data) => {
        showToastQuerySuccess('ADD_SUCCESS')(data)
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
          Thêm Nhà CC
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
            <FormSupplier
              defaultValues={initUserForm}
              onSubmit={handleSubmit}
              isLoading={loadingFile || loadingSubmit}
            />
          </CardContent>
        </Card>
      </Box>
    </>
  )
}
