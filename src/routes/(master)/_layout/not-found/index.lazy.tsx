import { createLazyFileRoute } from '@tanstack/react-router'

import { Box, Typography, Button } from '@mui/joy'
import { useNavigate } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(master)/_layout/not-found/')({
  component: NotFoundPage
})

export function NotFoundPage() {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate({ to: '/' })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        padding: 2
      }}
    >
      <Typography component='h1' sx={{ fontSize: '4rem', mb: 2 }} color='danger'>
        404
      </Typography>
      <Typography component='p' sx={{ mb: 2, fontSize: '20px', fontWeight: '500' }}>
        Trang này không tồn tại
      </Typography>
      <Button variant='solid' onClick={handleGoHome}>
        Trở lại
      </Button>
    </Box>
  )
}
