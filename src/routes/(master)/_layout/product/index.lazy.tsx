import { Add } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/joy'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(master)/_layout/product/')({
  component: () => <Page />
})

function Page() {
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
        <Button color='primary' startDecorator={<Add />} size='sm'>
          Tạo mới
        </Button>
      </Box>
    </>
  )
}
