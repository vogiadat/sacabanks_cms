import CardCategory from '@/components/category/CardCategory'
import Create from '@/components/category/create'
import WhiteList from '@/components/category/WhiteList'
import { getRandomImageUrl } from '@/utils'
import { HeartBroken } from '@mui/icons-material'
import { Box, Button, Grid, Stack, Typography } from '@mui/joy'
import { createLazyFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createLazyFileRoute('/(master)/_layout/category/')({
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

      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        {[...Array(8).keys()].map((_, index) => (
          <Grid xs={12} md={6} lg={4} xl={3} key={index}>
            <CardCategory
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
    </>
  )
}
