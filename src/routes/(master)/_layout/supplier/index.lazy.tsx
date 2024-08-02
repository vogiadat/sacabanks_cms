import { supplierApi } from '@/apis'
import { Pagination, Search } from '@/components/base'
import Filter from '@/components/base/Filter'
import Table, { ColumDef } from '@/components/base/Table'
import { EmptyItem } from '@/components/common'
import { LoadingFullPage } from '@/components/loading'
import { APP_RULE } from '@/constants'
import { image_default } from '@/constants/image.constant'
import { usePagination, useSetTotalPages } from '@/hooks'
import { IUserItem } from '@/interfaces'
import { getImageById } from '@/utils'
import { Add } from '@mui/icons-material'
import { Box, Button, Sheet, Typography } from '@mui/joy'
import { useQuery } from '@tanstack/react-query'
import { createLazyFileRoute, useRouter } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(master)/_layout/supplier/')({
  component: Page
})

function Page() {
  const { navigate } = useRouter()
  const { pagination, setPagination, handleNextPage, handlePrevPage, handleChangePage } = usePagination()

  const { data, isFetching, isLoading, isSuccess } = useQuery({
    queryKey: supplierApi.getKeyForList({ page: pagination.currentPage }),
    queryFn: () => supplierApi.getListPagination({ page: pagination.currentPage })
  })

  useSetTotalPages(isSuccess, pagination, setPagination, data?.data)

  const suppliers = data?.data.data.list || []

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
          Nhà cung cấp
        </Typography>
        <Button onClick={() => navigate({ to: '/supplier/create' })} color='primary' startDecorator={<Add />} size='sm'>
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
        <Search label='Tìm kiếm nhà cung cấp' />

        <Filter
          name='Quyền Hạn'
          items={[
            { value: 1, label: 'Quản Trị Viên Cao Cấp' },
            { value: 2, label: 'Quản Trị Viên' },
            { value: 3, label: 'Nhà Cung Cấp' },
            { value: 4, label: 'Khách Hàng' }
          ]}
          selectProps={{
            placeholder: 'Lọc theo quyền'
          }}
          onChange={console.log}
        />

        <Filter
          name='Sắp xếp'
          items={[
            { value: 'ASC', label: 'Giá tăng dần' },
            { value: 'DESC', label: 'Giá giảm dần' }
          ]}
          selectProps={{
            placeholder: 'Sắp xếp theo'
          }}
          onChange={console.log}
        />
      </Box>

      {isFetching || isLoading ? (
        <LoadingFullPage />
      ) : (
        <>
          {suppliers && suppliers.length > 0 ? (
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
              <Table rows={suppliers} columns={columnDef} />
            </Sheet>
          ) : (
            <EmptyItem />
          )}

          <Pagination
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
            handleChangePage={handleChangePage}
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages || 0}
            lambda={APP_RULE.PAGINATION.LAMBDA}
          />
        </>
      )}
    </>
  )
}

const columnDef: ColumDef<IUserItem>[] = [
  {
    associate: 'avatar',
    label: 'Ảnh',
    render: (row) => <img src={row.avatar ? getImageById(row.avatar) : image_default} width={100} />
  },
  {
    associate: 'email',
    label: 'Thông Tin',
    render: (row) => (
      <Typography fontWeight={600} gutterBottom>
        {(row.companyName || row.shortNameCompany) ?? 'Tên Doanh Nghiệp'}
      </Typography>
    )
  },
  {
    associate: 'fullNameOwnerCompany',
    label: 'Chủ Doanh Nghiệp'
  },
  {
    associate: 'address',
    label: 'Địa Chỉ'
  },
  {
    associate: 'phoneNumber',
    label: 'Số Điện Thoại'
  },
  {
    associate: 'linkWebsite',
    label: 'Website'
  },
  // {
  //   associate: 'isActive',
  //   label: 'Trạng Thái',
  //   render: (row) => (
  //     <Chip variant='soft' size='sm' color={row.isActive ? 'success' : 'warning'}>
  //       {row.isActive ? 'Đã Kích Hoạt' : 'Chưa Kích Hoạt'}
  //     </Chip>
  //   )
  // },
  {
    associate: 'actions',
    label: '',
    render: (row) => <ActionsHandle rowId={row.id} />
  }
]

const ActionsHandle = ({ rowId }: { rowId: string }) => {
  const { navigate } = useRouter()
  const handleNavigate = () => {
    navigate({ to: `update/${rowId}` })
  }
  return (
    <Button variant='plain' color='primary' size='sm' onClick={handleNavigate} sx={{ width: 'max-content' }}>
      Chi Tiết
    </Button>
  )
}
