import { Avatar, Box, Button, Sheet, Typography } from '@mui/joy'
import { InvalidateQueryFilters, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

import { userApi } from '@/apis/user.api'
import { APP_RULE } from '@/constants'
import { usePagination, useSearchFilter, useSetTotalPages } from '@/hooks'
import { IUserItem } from '@/interfaces'
import { RoleEnum, RoleMap } from '@/types'
import { showToastError, showToastQuerySuccess } from '@/utils'

import { Pagination, Search, Table } from '@/components/base'
import Filter from '@/components/base/Filter'
import { ColumDef } from '@/components/base/Table'
import { EmptyItem } from '@/components/common'
import { LoadingFullPage } from '@/components/loading'
import CreateUser from '@/components/user/create'
import { UserFormSchema } from '@/components/user/FormSchema'
import FormUser from '@/components/user/FormUser'

export const Route = createLazyFileRoute('/(master)/_layout/user/')({
  component: Page
})

function Page() {
  const { pagination, setPagination, handleNextPage, handlePrevPage, handleChangePage } = usePagination()
  const { search, setSearch, filter, setFilter } = useSearchFilter()
  const [limitPagination, setLimitPagination] = useState(APP_RULE.PAGINATION.LIMIT_PAGINATION)

  const params = { page: pagination.currentPage, limit: limitPagination, search, ...filter }

  const { data, isSuccess, isFetching, isLoading } = useQuery({
    queryKey: userApi.getKey('getListPagination', { params }),
    queryFn: () => userApi.getListPagination(params)
  })

  useSetTotalPages(isSuccess, pagination, setPagination, data?.data)

  const userList = data?.data.data.list || []

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
        <Search label='Tìm kiếm người dùng' onDebounceChange={setSearch} />

        <Filter
          name='Quyền Hạn'
          items={[
            { value: RoleEnum.SUPPER_ADMIN, label: 'Quản Trị Viên Cao Cấp' },
            { value: RoleEnum.ADMIN, label: 'Quản Trị Viên' },
            { value: RoleEnum.VENDOR, label: 'Nhà Cung Cấp' },
            { value: RoleEnum.CLIENT, label: 'Khách Hàng' }
          ]}
          selectProps={{
            placeholder: 'Lọc theo quyền'
          }}
          onChange={(value) => {
            setFilter({
              ...filter,
              role: value
            })
          }}
        />
      </Box>

      {isFetching || isLoading ? (
        <LoadingFullPage />
      ) : (
        <>
          {userList && userList.length > 0 ? (
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
              <Table<IUserItem> rows={userList} columns={columnDef} />
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
    render: (row) => <ActionsHandle user={row} />
  }
]

const ActionsHandle = ({ user }: { user: UserForm }) => {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: (data: UserFormSchema) => userApi.patch(user.id, data),
    onSuccess: (data) => {
      showToastQuerySuccess('UPDATE_SUCCESS')(data)
      queryClient.invalidateQueries(userApi.getKey() as InvalidateQueryFilters)
      setOpen(false)
    },
    onError: showToastError
  })

  const handleSubmit = async (_value: UserFormSchema) => {
    // console.log('🚀 ~ handleSubmit update ~ _value:', _value)
    mutate(_value)
  }

  return (
    <>
      <Button variant='plain' color='primary' size='sm' onClick={() => setOpen(true)}>
        Chi Tiết
      </Button>
      <FormUser
        open={open}
        setOpen={setOpen}
        defaultValues={{
          email: user.email,
          username: user.username,
          phoneNumber: user.phoneNumber,
          role: user.role.name,
          address: user.address || '',
          password: user.username
        }}
        userName={user.username}
        onSubmit={handleSubmit}
        id={user.id}
        isLoading={isPending}
      />
    </>
  )
}
