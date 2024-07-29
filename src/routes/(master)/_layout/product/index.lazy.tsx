import { productApi } from '@/apis'
import { Pagination, Search, Table } from '@/components/base'
import Filter from '@/components/base/Filter'
import { ColumDef } from '@/components/base/Table'
import { getRandomImageUrl } from '@/utils'
import { Add } from '@mui/icons-material'
import { Box, Button, Sheet, Typography } from '@mui/joy'
import { useQuery } from '@tanstack/react-query'
import { createLazyFileRoute, useRouter } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(master)/_layout/product/')({
  component: () => <Page />
})

function Page() {
  const { navigate } = useRouter()
  const { data } = useQuery({
    queryKey: productApi.getKeyForMyProduct(),
    queryFn: () => productApi.getMyProduct()
  })
  console.log('🚀 ~ Page ~ data:', data?.data.data)

  const rows = data?.data.data.map((item: IProductTable | any) => {
    return {
      id: item.id,
      title: item.title,
      tags: item.tags,
      image: getRandomImageUrl(),
      price: item.price,
      numberProductService: (item as any).user.numberProductService,
      companyName: (item as any).user.shortNameCompany
    }
  })

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
        <Button onClick={() => navigate({ to: '/product/create' })} color='primary' startDecorator={<Add />} size='sm'>
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
        {rows && rows.length > 0 && <Table<IProductTable> rows={rows} columns={columnDef} />}
      </Sheet>

      <Pagination />
    </>
  )
}

interface IProductTable {
  id: number
  mainPhoto: string
  title: string
  tags: string
  companyName: string
  numberProductService: number
  price: number
}

const columnDef: ColumDef<IProductTable>[] = [
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
    label: 'Tags'
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
