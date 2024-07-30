import { Box, Typography } from '@mui/joy'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import { createFileRoute } from '@tanstack/react-router'

import { productApi } from '@/apis'
import FormProduct from '@/components/product/FormProduct'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { APP_MESSAGE } from '@/constants'
import { ProductForm } from '@/components/product'
import { IProductItem } from '@/interfaces/product.interface'

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
    mutationFn: (data: any) => productApi.patch(id, data),
    onSuccess: (updatedProductResponse) => {
      const updatedProduct = updatedProductResponse?.data?.data

      if (updatedProduct) {
        toast.success(APP_MESSAGE.FORM.UPDATE_SUCCESS)
      }
    },
    onError: (e) => {
      toast.error(APP_MESSAGE.FORM.UPDATE_FAILED)
    }
  })

  const productData = data?.data?.data
  console.log('🚀 ~ Page ~ productData:', productData)

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
            {productData && <FormProduct defaultValues={productData} onSubmit={handleSubmit} isLoading={isPending} />}
          </CardContent>
        </Card>
      </Box>
    </>
  )
}