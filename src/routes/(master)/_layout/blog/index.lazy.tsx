import { blogApi } from '@/apis'
import { Search } from '@/components/base'
import Table, { ColumDef } from '@/components/base/Table'
import { EmptyItem } from '@/components/common'
import { LoadingFullPage } from '@/components/loading'
import { IBlog } from '@/interfaces/blog.interface'
import { Add } from '@mui/icons-material'
import { Box, Button, Chip, Stack, Typography } from '@mui/joy'
import { useQuery } from '@tanstack/react-query'
import { createLazyFileRoute, useRouter } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(master)/_layout/blog/')({
  component: Page
})

function Page() {
  const { navigate } = useRouter()
  const { data, isFetching } = useQuery({
    queryKey: blogApi.getKey('getList'),
    queryFn: () => blogApi.getList()
  })

  const blogs = data?.data.data || []

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
          Bài viết
        </Typography>

        <Stack
          direction='row'
          justifyContent='center'
          alignItems='center'
          spacing={1}
        >
          <Button
            onClick={() => navigate({ to: '/blog/create' })}
            color='primary'
            startDecorator={<Add />}
            size='sm'
          >
            Tạo mới
          </Button>
        </Stack>
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
        <Search label='Tìm kiếm' />
      </Box>

      <Box
        component='div'
        sx={{
          height: '100%',
          overflow: 'scroll',
          overflowX: 'hidden'
        }}
        className='custom-scrollbar'
      >
        {isFetching ? (
          <LoadingFullPage />
        ) : blogs.length ? (
          <Table rows={blogs} columns={columnDef} />
        ) : (
          <EmptyItem />
        )}
      </Box>
    </>
  )
}

const columnDef: ColumDef<IBlog>[] = [
  {
    associate: 'title',
    label: 'Tiêu đề'
  },
  {
    associate: 'focusKeywords',
    label: 'Tags',
    render(value) {
      return (
        <Stack direction={'row'} spacing={1}>
          {value.focusKeywords?.map((keyword, index) => (
            <Chip color='success' key={index}>
              {keyword}
            </Chip>
          ))}
        </Stack>
      )
    }
  },
  {
    associate: 'slug',
    label: 'Đường dẫn'
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
