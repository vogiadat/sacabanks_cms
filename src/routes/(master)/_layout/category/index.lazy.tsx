import Create from '@/components/category/create'
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined'
import { Box, Button, Chip, Typography } from '@mui/joy'
import AspectRatio from '@mui/joy/AspectRatio'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import IconButton from '@mui/joy/IconButton'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(master)/_layout/category/')({
  component: () => (
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
          Categories
        </Typography>

        <Create />
      </Box>

      <Box>
        <Card sx={{ width: 320 }}>
          <div>
            <Typography level='title-lg'>Yosemite National Park</Typography>
            <Typography level='body-sm'>April 24 to May 02, 2021</Typography>
            <IconButton
              aria-label='bookmark Bahamas Islands'
              variant='plain'
              color='neutral'
              size='sm'
              sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
            >
              <BookmarkAdd />
            </IconButton>
          </div>
          <AspectRatio minHeight='120px' maxHeight='200px'>
            <img
              src='https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286'
              srcSet='https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x'
              loading='lazy'
              alt=''
            />
          </AspectRatio>
          <CardContent orientation='horizontal'>
            <div>
              <Typography level='body-xs'>Status</Typography>
              <Chip color='success' onClick={function () {}}>
                Active
              </Chip>
            </div>
            <Button
              variant='solid'
              size='md'
              color='primary'
              aria-label='Explore Bahamas Islands'
              sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
            >
              Chỉnh sửa
            </Button>
          </CardContent>
        </Card>
      </Box>
    </>
  )
})
