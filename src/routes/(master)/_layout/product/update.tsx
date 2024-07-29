import { Box, Typography } from '@mui/joy'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import { createFileRoute } from '@tanstack/react-router'

import FormProduct from '@/components/product/FormProduct'

export const Route = createFileRoute('/(master)/_layout/product/update')({
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
            <FormProduct defaultValues={fakeUpdateProductData} onSubmit={console.log} />
          </CardContent>
        </Card>
      </Box>
    </>
  )
}

const fakeUpdateProductData = {
  title: 'Xe tank phá cổng dinh độc lập',
  slug: 'xe-tank-pha-cong-dinh-doc-lap',
  itemNumber: 'CMT81945',
  material: 'FE2SO4',
  finishing: 'Dinh Doc Lap',
  dimensionL: 120,
  dimensionW: 60,
  dimensionH: 45,
  netWeight: 20,
  price: 299.99,
  quantity: 50,
  mainPhoto: 'https://photo.znews.vn/w660/Uploaded/mdf_nsozxd/2019_04_30/1_1.jpg',
  tags: 'pha cong, xe tank, dinh doc lap, cmt8, 1945',
  desc: 'Cách mạng tháng Tám còn gọi là Tổng khởi nghĩa tháng Tám là tên gọi ngành sử học chính thống tại Việt Nam hiện nay dùng để chỉ việc phong trào Việt Minh tiến hành khởi nghĩa chống Đế quốc Nhật Bản, buộc Đế quốc Việt Nam bàn giao chính quyền trung ương và các địa phương và buộc Bảo Đại phải thoái vị trong tháng 8 năm',
  categoryId: 'furniture-123',
  listDetails: [
    { name: 'Color', desc: 'Natural Oak' },
    { name: 'Assembly Required', desc: 'Yes' },
    { name: 'Warranty', desc: '2 Years' }
  ]
}
