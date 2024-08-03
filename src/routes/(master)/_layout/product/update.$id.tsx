import { Box, Grid, Tab, TabList, TabPanel, Tabs, Typography } from '@mui/joy'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import { createFileRoute, useRouter } from '@tanstack/react-router'

import { productApi, uploadApi } from '@/apis'
import { ProductForm } from '@/components/product'
import FormProduct from '@/components/product/FormProduct'
import { getImageById, showToastError, showToastQuerySuccess } from '@/utils'
import { useMutation, useQuery } from '@tanstack/react-query'
import { CardImage, CreateImage } from '@/components/images'

export const Route = createFileRoute('/(master)/_layout/product/update/$id')({
  component: () => <Page />
})

function Page() {
  const { id } = Route.useParams()
  const { navigate } = useRouter()

  const { data } = useQuery({
    queryKey: productApi.getKey('findById', { id }),
    queryFn: () => productApi.findById(id)
  })
  const { isPending: isPendingUpload, mutateAsync: upload } = useMutation({
    mutationFn: (data: { file: File }) => uploadApi.create(data, 'multipart/form-data')
  })
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: ProductForm) => productApi.patch(id, data)
  })

  const productData = data?.data?.data

  const handleSubmit = async (_value: ProductForm) => {
    _value.mainPhoto = productData?.mainPhoto!

    if (_value.mainPhotoFile) {
      await upload({ file: _value.mainPhotoFile })
        .then((res) => (_value.mainPhoto = res.data.data))
        .catch(showToastError)
    }

    await mutateAsync(_value)
      .then((data) => {
        showToastQuerySuccess('UPDATE_SUCCESS')(data)
        navigate({ to: '/product' })
      })
      .catch(showToastError)
  }

  return (
    <Box
      sx={{
        overflow: 'scroll'
      }}
    >
      <Tabs aria-label='Basic tabs' size='sm' defaultValue={0}>
        <TabList>
          <Tab>Sản phẩm</Tab>
          <Tab>Ảnh phụ</Tab>
        </TabList>
        {/* // * Tab item 1 */}
        <TabPanel value={0}>
          {/* <Box
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
      </Box> */}

          <Box
            sx={{
              flexGrow: 1,
              m: -1,
              overflowX: 'hidden'
            }}
            className='custom-scrollbar'
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
                    isLoading={isPending || isPendingUpload}
                  />
                )}
              </CardContent>
            </Card>
          </Box>
        </TabPanel>
        {/* // * Tab item 2 */}
        <TabPanel value={1}>
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
              Danh sách ảnh phụ
            </Typography>

            <div>
              <CreateImage productId={id} />
            </div>
          </Box>
          <Box
            component='div'
            sx={{
              height: '100%',
              overflow: 'scroll',
              overflowX: 'hidden'
            }}
            className='custom-scrollbar'
          >
            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
              {productData?.listPhoto.map((item) => (
                <Grid key={item.id} xs={12} md={6} lg={4} xl={3}>
                  <CardImage item={item} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </TabPanel>
      </Tabs>
    </Box>
  )
}
