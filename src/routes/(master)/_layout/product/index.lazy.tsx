import { useMemo, useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { createLazyFileRoute, useRouter } from '@tanstack/react-router'

import { categoryApi, productApi } from '@/apis'
import { APP_RULE, SORT_SELECT } from '@/constants'
import { image_default } from '@/constants/image.constant'
import { usePagination, useSetTotalPages } from '@/hooks'
import { IProductItem } from '@/interfaces'
import { getImageById } from '@/utils'

import { Pagination, Search, Table } from '@/components/base'
import Filter from '@/components/base/Filter'
import { ColumDef } from '@/components/base/Table'
import { EmptyItem } from '@/components/common'
import { LoadingFullPage } from '@/components/loading'
import { Add } from '@mui/icons-material'
import { Box, Button, Sheet, Typography } from '@mui/joy'
import { useSearchFilter } from '@/hooks/use-search-filter'
import { SortType } from '@/types'

export const Route = createLazyFileRoute('/(master)/_layout/product/')({
  component: Page
})

function Page() {
  const { navigate } = useRouter()
  const [limitPagination, setLimitPagination] = useState(APP_RULE.PAGINATION.LIMIT_PAGINATION)
  const { search, setSearch, filter, setFilter, sort, setSort } = useSearchFilter()
  const { pagination, setPagination, handleNextPage, handlePrevPage, handleChangePage } = usePagination()

  const { data, isFetching, isSuccess } = useQuery({
    queryKey: productApi.getKey(
      'other',
      {
        params: {
          page: pagination.currentPage,
          limit: limitPagination,
          search,
          ...filter
        }
      },
      'public'
    ),
    queryFn: () =>
      productApi.getPublic({
        page: pagination.currentPage,
        limit: limitPagination,
        search,
        ...filter
      })
  })
  const { data: categoryData } = useQuery({
    queryKey: categoryApi.getKey(),
    queryFn: () => categoryApi.getList()
  })

  const categoryList = categoryData?.data.data ?? []

  const categoryListSelect = categoryList.map((item) => ({
    value: item.id,
    label: item.name
  }))

  console.log('🚀 ~ Page ~ productPublicData:', data)

  useSetTotalPages(isSuccess, pagination, setPagination, data?.data, search, limitPagination)

  const productList = data?.data.data.list

  const sortedProductList = useMemo(() => {
    if (!productList) return []

    // Handle ascending and descending sorting
    return [...productList].sort((a, b) => {
      if (sort === 'ASC') {
        return a.price - b.price
      } else if (sort === 'DESC') {
        return b.price - a.price
      }
      return 0
    })
  }, [productList, sort])

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
          gap: 1.5
        }}
      >
        <Search label='Tìm kiếm sản phẩm' onDebounceChange={setSearch} />

        <Filter
          name='Danh Mục'
          items={categoryListSelect}
          onChange={(value) => {
            setFilter({
              ...filter,
              category_id: value
            })
          }}
        />

        <Filter
          name='Sắp xếp'
          items={SORT_SELECT}
          selectProps={{
            placeholder: 'sắp xếp theo'
          }}
          onChange={(value) => setSort(value as SortType)}
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
              <Table<ProductForm> rows={sortedProductList} columns={columnDef} />
            </Sheet>
          ) : (
            <EmptyItem />
          )}
        </>
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
