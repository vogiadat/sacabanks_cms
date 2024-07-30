import { userApi } from '@/apis/user.api'
import { Pagination, Search, Table } from '@/components/base'
import Filter from '@/components/base/Filter'
import { ColumDef } from '@/components/base/Table'
import CreateUser from '@/components/user/create'
import { IUserItem } from '@/interfaces'
import { Avatar, Box, Button, Sheet, Typography } from '@mui/joy'
import { useQuery } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'
import { RoleMap } from '@/types'

export const Route = createLazyFileRoute('/(master)/_layout/user/')({
  component: Page
})

function Page() {
  const { data } = useQuery({
    queryKey: userApi.getKeyForList(),
    queryFn: () => userApi.getList()
  })

  const userList = data?.data.data

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
          Người Dùng
        </Typography>
        <CreateUser />
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
        className='OrderTableContainer no-scrollbar'
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
        <Table<IUserItem> rows={userList ?? []} columns={columnDef} />
      </Sheet>

      <Pagination />
    </>
  )
}

interface UserForm extends IUserItem {
  actions?: string
}

const columnDef: ColumDef<UserForm>[] = [
  {
    associate: 'email',
    label: 'Thông Tin',
    render: (row) => (
      <Box display={'flex'} gap={1} alignItems={'center'}>
        <Avatar size='sm'>{row.username.at(0)}</Avatar>
        <Sheet sx={{ bgcolor: 'inherit' }}>
          <Typography fontWeight={600} gutterBottom>
            {row.username}
          </Typography>
          <Typography level='body-xs' gutterBottom>
            {row.email}
          </Typography>
        </Sheet>
      </Box>
    )
  },
  {
    associate: 'phoneNumber',
    label: 'Số Điện Thoại'
  },
  {
    associate: 'role',
    label: 'Quyền Hạn',
    render: (row) =>
      Object.keys(RoleMap).map((key) => {
        if (key === row.role.name) return RoleMap[key as keyof typeof RoleMap]
      })
  },
  {
    associate: 'actions',
    label: '',
    render: () => (
      <Button color='primary' size='sm'>
        Chỉnh Sửa
      </Button>
    )
  }
]
