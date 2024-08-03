import { APP_MESSAGE } from '@/constants'
import { Button, Sheet, Typography } from '@mui/joy'
import { useNavigate } from '@tanstack/react-router'

export const ComingSoon = () => {
  const navigate = useNavigate()
  return (
    <Sheet
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: 3,
        textAlign: 'center',
        background: '#fff'
      }}
    >
      <Typography
        level='h1'
        sx={{ mb: 2, fontWeight: 'bold', fontSize: '3rem' }}
      >
        {APP_MESSAGE.HTTP.MAINTENANCE.DEVELOP}
      </Typography>
      <Typography sx={{ mb: 4, fontSize: '1.2rem' }}>
        {APP_MESSAGE.HTTP.MAINTENANCE.PAGE}
      </Typography>
      <Button
        variant='solid'
        color='primary'
        size='lg'
        sx={{ mt: 2 }}
        onClick={() => navigate({ to: '/' })}
      >
        Trang chủ
      </Button>
    </Sheet>
  )
}
