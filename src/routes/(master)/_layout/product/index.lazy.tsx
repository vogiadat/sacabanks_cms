import { Pagination, Search, Table } from '@/components/base'
import Filter from '@/components/base/Filter'
import { ColumDef } from '@/components/base/Table'
import { getRandomImageUrl } from '@/utils'
import { Add } from '@mui/icons-material'
import { Box, Button, Sheet, Typography } from '@mui/joy'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(master)/_layout/product/')({
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
        <Button color='primary' startDecorator={<Add />} size='sm'>
          Tạo mới
        </Button>
      </Box>

      <Box
        className='SearchAndFilters-tabletUp'
        sx={{
          borderRadius: 'sm',
          py: 2,
          display: { xs: 'none', sm: 'flex' },
          flexWrap: 'wrap',
          gap: 1.5,
          '& > *': {
            minWidth: { xs: '120px', md: '160px' }
          }
        }}
      >
        <Search label='Search for product' />

        <Filter
          name='Danh Mục'
          items={[
            { value: 1, label: 'Kệ sách' },
            { value: 2, label: 'Tủ gì gì đó' }
          ]}
          onChange={console.log}
        />

        <Filter
          name='Sắp xếp'
          items={[
            { value: 'ASC', label: 'Giá tăng dần' },
            { value: 'DESC', label: 'Giá giảm dần' }
          ]}
          selectProps={{
            placeholder: 'sắp xếp theo'
          }}
          onChange={console.log}
        />
      </Box>

      <Sheet
        className='OrderTableContainer'
        variant='outlined'
        sx={{
          display: { xs: 'none', sm: 'initial' },
          width: '100%',
          borderRadius: 'sm',
          flexShrink: 1,
          overflow: 'auto',
          minHeight: 0
        }}
      >
        <Table<ProductHardCode> rows={rows} columns={columnDef} />
      </Sheet>

      <Pagination />
    </>
  )
}

interface ProductHardCode {
  id: number
  mainPhoto: string
  title: string
  tags: string
  companyName: string
  numberProductService: number
  price: number
}

const rows: ProductHardCode[] = [
  {
    id: 1,
    mainPhoto: getRandomImageUrl(),
    title: 'Hello bà già',
    tags: 'New, Hot',
    companyName: 'Viet Travel',
    numberProductService: 20,
    price: 20000
  }
]

const columnDef: ColumDef<ProductHardCode>[] = [
  { associate: 'id', label: 'ID' },
  {
    associate: 'mainPhoto',
    label: 'Image',
    render: (row) => <img src={row.mainPhoto} width={100} />
  },
  {
    associate: 'title',
    label: 'Tiêu Đề'
  },
  {
    associate: 'tags',
    label: 'Tiêu Đề'
  },
  {
    associate: 'companyName',
    label: 'Tên công ti'
  },
  {
    associate: 'numberProductService',
    label: 'Số lượng dịch vụ'
  },
  {
    associate: 'price',
    label: 'Giá'
  }
]
