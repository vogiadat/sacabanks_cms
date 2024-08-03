import { createLazyFileRoute } from '@tanstack/react-router'
import Create from '@/components/category/create'
import WhiteList from '@/components/category/WhiteList'
import { getRandomImageUrl } from '@/utils'
import { Box, Grid, Stack, Typography } from '@mui/joy'
import { useState } from 'react'
import CardBanner from '@/components/banner/CardBanner'

export const Route = createLazyFileRoute('/(master)/_layout/banner/')({
  component: Page
})

function Page() {
  const [openWhiteList, setOpenWhiteList] = useState(false)
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
          Ảnh Bìa
        </Typography>

        <Stack
          direction='row'
          justifyContent='center'
          alignItems='center'
          spacing={1}
        >
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
        className='custom-scrollbar'
      >
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
          {[...Array(8).keys()].map((_, index) => (
            <Grid xs={12} md={6} lg={4} key={index}>
              <CardBanner
                onAddToCategoryHome={() => setOpenWhiteList(true)}
                category={{
                  name: 'Yosemite National Park',
                  image: getRandomImageUrl(),
                  rank: 1
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  )
}
