import { Box, Button, Typography } from '@mui/joy'
import { createLazyFileRoute } from '@tanstack/react-router'
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded'
import OrderTable from '@/components/OrderTable'
import OrderList from '@/components/OrderList'

export const Route = createLazyFileRoute('/(master)/_layout/order/')({
  component: () => {
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
            Orders
          </Typography>
          <Button
            color='primary'
            startDecorator={<DownloadRoundedIcon />}
            size='sm'
          >
            Download PDF
          </Button>
        </Box>

        <OrderTable />
        <OrderList />
      </>
    )
  }
})
