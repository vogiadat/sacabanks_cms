import { Box, Typography } from '@mui/joy'
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'

import { productApi } from '@/apis'
import FormProduct from '@/components/product/FormProduct'
import { initProduct, ProductForm } from '@/components/product/FormSchema'
import { showToastQuerySuccess } from '@/utils'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import { useMutation } from '@tanstack/react-query'

export const Route = createLazyFileRoute('/(master)/_layout/product/create')({
  component: () => <Page />
})

function Page() {
  const navigate = useNavigate()
  const { mutate } = useMutation({
    mutationFn: (data: any) => productApi.create(data),
    onSuccess: (newProduct) => {
      showToastQuerySuccess('ADD_SUCCESS')(newProduct)
      navigate({ to: '/product' })
    }
  })

  const handleSubmit = (_value: ProductForm) => {
    mutate(_value)
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
          Sản Phẩm
        </Typography>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          m: -1,
          overflowX: 'hidden'
        }}
        className='custom-scrollbar'
      >
        <Card>
          <Typography level='title-lg'>Thông tin cơ bản</Typography>
          <CardContent>
            <FormProduct defaultValues={initProduct} onSubmit={handleSubmit} />
          </CardContent>
        </Card>
      </Box>
    </>
  )
}
