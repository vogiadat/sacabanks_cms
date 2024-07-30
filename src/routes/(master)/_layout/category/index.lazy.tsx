import { categoryApi } from '@/apis/category.api'
import CardCategory from '@/components/category/CardCategory'
import Create from '@/components/category/create'
import WhiteList from '@/components/category/WhiteList'
import { LoadingFullPage } from '@/components/loading'
import { image_default } from '@/constants/image.constant'
import { ICategoryItem } from '@/interfaces'
import { getImageById } from '@/utils'
import { HeartBroken } from '@mui/icons-material'
import { Box, Button, Grid, Stack, Typography } from '@mui/joy'
import { useQuery } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createLazyFileRoute('/(master)/_layout/category/')({
  component: Page
})

function Page() {
  const [openWhiteList, setOpenWhiteList] = useState(false)

  const { data, error, isLoading, status } = useQuery({
    queryKey: categoryApi.getKeyForList(),
    queryFn: () => categoryApi.getList()
  })

  const categoryList = data?.data.data as ICategoryItem[]

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
          Danh Mục
        </Typography>

        <Stack direction='row' justifyContent='center' alignItems='center' spacing={1}>
          <Button color='success' startDecorator={<HeartBroken />} size='sm' onClick={() => setOpenWhiteList(true)}>
            Nổi Bật
          </Button>
          <Create />
        </Stack>
      </Box>

      <WhiteList open={openWhiteList} setOpen={setOpenWhiteList} />

      <Box
        component='div'
        sx={{
          height: '100%',
          overflow: 'scroll',
          overflowX: 'hidden'
        }}
      >
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
          {isLoading ? (
            <Box
              sx={{
                height: '100vh',
                width: '100%'
              }}
            >
              <LoadingFullPage isChild />
            </Box>
          ) : (
            categoryList &&
            categoryList.map((item, index) => {
              const getImage = getImageById(item.image)
              const image = getImage ? getImage : image_default

              return (
                <Grid xs={12} md={6} lg={4} xl={3} key={index}>
                  <CardCategory
                    onAddToCategoryHome={() => setOpenWhiteList(true)}
                    category={{
                      id: item.id,
                      name: item.name,
                      image,
                      rank: item.rank,
                      imageId: item.image
                    }}
                  />
                </Grid>
              )
            })
          )}
        </Grid>
      </Box>
    </>
  )
}
