import { Box, Typography } from '@mui/joy'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import { createFileRoute } from '@tanstack/react-router'

import { productApi } from '@/apis'
import { ProductForm } from '@/components/product'
import FormProduct from '@/components/product/FormProduct'
import { getImageById, showToastError, showToastQuerySuccess } from '@/utils'
import { useMutation, useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/(master)/_layout/product/update/$id')({
  component: () => <Page />
})

function Page() {
  const { id } = Route.useParams()
  console.log('🚀 ~ Page ~ id:', id)
  const { data } = useQuery({
    queryKey: productApi.getKeyForFindById(id),
    queryFn: () => productApi.findById(id)
  })
  const { mutate, isPending } = useMutation({
    mutationFn: (data: ProductForm) => productApi.patch(id, data),
    onSuccess: showToastQuerySuccess('UPDATE_SUCCESS'),
    onError: showToastError
  })

  const productData = data?.data?.data
  // console.log('🚀 ~ Page ~ productData:', productData)

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
      >
        <Card>
          <div>
            <Typography level='title-lg'>Thông tin cơ bản</Typography>
          </div>
          <CardContent>
            {productData && (
              <FormProduct
                defaultValues={{
                  ...productData,
                  price: productData.price || 0,
                  quantity: productData.quantity || 0,
                  mainPhoto: getImageById(productData.mainPhoto)
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
