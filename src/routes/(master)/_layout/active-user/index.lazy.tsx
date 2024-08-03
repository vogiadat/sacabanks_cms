import { activeUserApi } from '@/apis'
import { createLazyFileRoute, useRouter } from '@tanstack/react-router'
import { Pagination, Search, Table } from '@/components/base'
import { ColumDef } from '@/components/base/Table'
import { IActiveUserItem } from '@/interfaces'
import { Box, Button, Chip, Sheet, Typography } from '@mui/joy'
import { useQuery } from '@tanstack/react-query'
import { LoadingFullPage } from '@/components/loading'
import { EmptyItem } from '@/components/common'
import { APP_RULE } from '@/constants'
import { usePagination, useSearchFilter, useSetTotalPages } from '@/hooks'
import { useState } from 'react'

export const Route = createLazyFileRoute('/(master)/_layout/active-user/')({
  component: Page
})

function Page() {
  const [limitPagination, setLimitPagination] = useState(APP_RULE.PAGINATION.LIMIT_PAGINATION)
  const { search, setSearch, filter } = useSearchFilter()
  const { pagination, setPagination, handleNextPage, handlePrevPage, handleChangePage } = usePagination()

  const { data, isFetching, isLoading, isSuccess } = useQuery({
    queryKey: activeUserApi.getKey('getListPagination', {
      params: {
        page: pagination.currentPage,
        limit: limitPagination,
        search,
        ...filter
      }
    }),
    queryFn: () =>
      activeUserApi.getListPagination({
        page: pagination.currentPage,
        limit: limitPagination,
        search,
        ...filter
      })
  })

  useSetTotalPages(isSuccess, pagination, setPagination, data?.data, search, limitPagination)

  const activeUserList = data?.data.data.list ?? []

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
          Đơn Tham Gia
        </Typography>
        {/* <CreateUser /> */}
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
        <Search label='Tìm kiếm doanh nghiệp' onDebounceChange={setSearch} />
      </Box>

      {/* <Pagination /> */}
      {isFetching || isLoading ? (
        <LoadingFullPage />
      ) : (
        <>
          {activeUserList && activeUserList.length > 0 ? (
            <Sheet
              className='OrderTableContainer custom-scrollbar'
              variant='outlined'
              sx={{
                display: 'initial',
                width: '100%',
                borderRadius: 'sm',
                flexShrink: 1,
                minHeight: 0,
                overflow: 'auto'
              }}
            >
              <Table<IActiveUserItem> rows={activeUserList} columns={columnDef} />
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
            pageOptions={{
              limit: limitPagination,
              onLimitChange: setLimitPagination
            }}
          />
        </>
      )}
    </>
  )
}

const columnDef: ColumDef<IActiveUserItem>[] = [
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
    associate: 'phone',
    label: 'Số Điện Thoại'
  },
  {
    associate: 'linkWebsite',
    label: 'Website'
  },
  {
    associate: 'isActive',
    label: 'Trạng Thái',
    render: (row) => (
      <Chip variant='soft' size='sm' color={row.isActive ? 'success' : 'warning'}>
        {row.isActive ? 'Đã Kích Hoạt' : 'Chưa Kích Hoạt'}
      </Chip>
    )
  },
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
    <Button variant='plain' color='primary' size='sm' onClick={handleNavigate}>
      Chi Tiết
    </Button>
  )
}
