import { Box, Typography } from '@mui/joy'
import { createFileRoute } from '@tanstack/react-router'

import FormProduct from '@/components/product/FormProduct'
import { initProduct } from '@/components/product/FormSchema'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'

export const Route = createFileRoute('/(master)/_layout/product/create')({
  component: () => <Page />
})

function Page() {
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
            <FormProduct defaultValues={initProduct} onSubmit={console.log} />
          </CardContent>
        </Card>
      </Box>
    </>
  )
}
