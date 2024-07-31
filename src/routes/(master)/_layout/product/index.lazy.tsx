import { useQuery } from '@tanstack/react-query'
import { createLazyFileRoute, useRouter } from '@tanstack/react-router'

import { productApi } from '@/apis'
import { APP_RULE } from '@/constants'
import { image_default } from '@/constants/image.constant'
import { usePagination, useSetTotalPages } from '@/hooks'
import { IProductItem } from '@/interfaces'
// import { formatUnikey, generateSlug } from '@/utils'

import { Add } from '@mui/icons-material'
import { Box, Button, Sheet, Typography } from '@mui/joy'
import { Pagination, Search, Table } from '@/components/base'
import Filter from '@/components/base/Filter'
import { ColumDef } from '@/components/base/Table'
import { EmptyItem } from '@/components/common'
import { LoadingFullPage } from '@/components/loading'
import { getImageById } from '@/utils'

export const Route = createLazyFileRoute('/(master)/_layout/product/')({
  component: Page
})

function Page() {
  const { navigate } = useRouter()
  const { pagination, setPagination, handleNextPage, handlePrevPage, handleChangePage } = usePagination()
  const { data, isFetching, isSuccess } = useQuery({
    queryKey: productApi.getKeyForPublic({ page: pagination.currentPage }),
    queryFn: () => productApi.getPublic({ page: pagination.currentPage })
  })

  const totalPages = data?.data.data.count

  useSetTotalPages(isSuccess, pagination, setPagination, totalPages ?? 1)

  const productList = data?.data.data.list

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
        sx={{
          borderRadius: 'sm',
          py: 2,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1.5,
          '& > *': {
            minWidth: { xs: '120px', md: '160px' }
          }
        }}
      >
        <Search label='Tìm kiếm người dùng' />

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

      {isFetching ? (
        <LoadingFullPage />
      ) : (
        <>
          {productList && productList.length > 0 ? (
            <Sheet
              className='OrderTableContainer custom-scrollbar'
              variant='outlined'
              sx={{
                display: 'initial',
                width: '100%',
                borderRadius: 'sm',
                flexShrink: 1,
                overflow: 'auto',
                minHeight: 0
              }}
            >
              <Table<ProductForm> rows={productList} columns={columnDef} />
            </Sheet>
          ) : (
            <EmptyItem />
          )}

          <Pagination
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
            handleChangePage={handleChangePage}
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            lambda={APP_RULE.PAGINATION.LAMBDA}
          />
        </>
      )}
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
    render: (row) => <img src={row.mainPhoto ? getImageById(row.mainPhoto) : image_default} width={100} />
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
    <Button variant='plain' color='primary' size='sm' onClick={handleNavigate}>
      Chi Tiết
    </Button>
  )
}
