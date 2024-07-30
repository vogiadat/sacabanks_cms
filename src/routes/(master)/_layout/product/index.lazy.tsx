import { productApi } from '@/apis'
import { Pagination, Search, Table } from '@/components/base'
import Filter from '@/components/base/Filter'
import { ColumDef } from '@/components/base/Table'
import { image_default } from '@/constants/image.constant'
import { IProductItem } from '@/interfaces'
import { FilterType } from '@/types'
import { Add } from '@mui/icons-material'
import { Box, Button, Sheet, Typography } from '@mui/joy'
import { useQuery } from '@tanstack/react-query'
import { createLazyFileRoute, useRouter } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(master)/_layout/product/')({
  component: Page
})

function Page() {
  const { navigate } = useRouter()
  const { data } = useQuery({
    queryKey: productApi.getKeyForMyProduct(),
    queryFn: () => productApi.getMyProduct()
  })

  const productList = data?.data.data

  const filterList: FilterType[] = [
    {
      name: 'Danh Mục',
      items: [
        { value: 1, label: 'Kệ sách' },
        { value: 2, label: 'Tủ gì gì đó' }
      ],
      onChange: console.log
    },
    {
      name: 'Sắp xếp',
      items: [
        { value: 'ASC', label: 'Giá tăng dần' },
        { value: 'DESC', label: 'Giá giảm dần' }
      ],
      selectProps: {
        placeholder: 'Sắp xếp theo'
      },
      onChange: console.log
    }
  ]

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
        <Typography level='h2' component='h1' textColor={'primary.500'}>
          Sản Phẩm
        </Typography>
        <Button onClick={() => navigate({ to: '/product/create' })} color='primary' startDecorator={<Add />} size='sm'>
          Tạo mới
        </Button>
      </Box>

      <Box
        sx={{
          borderRadius: 'sm',
          py: 2,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1.5
        }}
      >
        <Search label='Tìm kiếm người dùng' />

        <Filter filterList={filterList} />
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
        {productList && productList.length > 0 && <Table<ProductForm> rows={productList} columns={columnDef} />}
      </Sheet>

      <Pagination />
    </>
  )
}

interface ProductForm extends IProductItem {
  actions?: string
}

const columnDef: ColumDef<ProductForm>[] = [
  {
    associate: 'mainPhoto',
    label: 'Ảnh Sản Phẩm',
    render: (row) => <img src={row.mainPhoto ? row.mainPhoto : image_default} width={100} />
  },
  {
    associate: 'title',
    label: 'Sản Phẩm'
  },
  {
    associate: 'tags',
    label: 'Tags'
  },
  {
    associate: 'user',
    label: 'Doanh Nghiệp',
    render: (row) => row.user.companyName
  },
  {
    associate: 'quantity',
    label: 'Số Lượng'
  },
  {
    associate: 'price',
    label: 'Giá'
  },
  {
    associate: 'actions',
    label: '',
    render: (row) => <ActionsTable rowId={row.id} />
  }
]

const ActionsTable = ({ rowId }: { rowId: string }) => {
  const { navigate } = useRouter()

  const handleNavigate = () => {
    navigate({ to: `update/${rowId}` })
  }
  return (
    <Button color='primary' size='sm' onClick={handleNavigate}>
      Chỉnh Sửa
    </Button>
  )
}
