import { activeUserApi } from '@/apis'
import { createLazyFileRoute, useRouter } from '@tanstack/react-router'
import { Search, Table } from '@/components/base'
import Filter from '@/components/base/Filter'
import { ColumDef } from '@/components/base/Table'
import { IActiveUserItem } from '@/interfaces'
import { Box, Button, Chip, Sheet, Typography } from '@mui/joy'
import { useQuery } from '@tanstack/react-query'

export const Route = createLazyFileRoute('/(master)/_layout/active-user/')({
  component: Page
})

function Page() {
  const { data } = useQuery({
    queryKey: activeUserApi.getKeyForList(),
    queryFn: () => activeUserApi.getList()
  })

  const activeList = data?.data.data

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
        <Search label='Tìm kiếm người dùng' />

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
        <Table<IActiveUserItem> rows={activeList ?? []} columns={columnDef} />
      </Sheet>

      {/* <Pagination /> */}
    </>
  )
}

interface ActiveForm extends IActiveUserItem {
  actions?: string
}

const columnDef: ColumDef<ActiveForm>[] = [
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
