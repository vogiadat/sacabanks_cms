import { Button, Typography } from '@mui/joy'
import { createLazyFileRoute } from '@tanstack/react-router'
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded'

export const Route = createLazyFileRoute('/(master)/_layout/order/')({
  component: () => {
    return (
      <>
        <Typography level='h2' component='h1'>
          Order
        </Typography>
        <Button color='primary' startDecorator={<DownloadRoundedIcon />} size='sm'>
          Download PDF
        </Button>
      </>
    )
  }
})
