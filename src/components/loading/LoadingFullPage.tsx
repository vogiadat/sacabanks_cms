import { Box } from '@mui/joy'
import { LoadingItem } from '@/components/loading'

export const LoadingFullPage = () => {
  return (
    <Box
      component={'div'}
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ddd'
      }}
    >
      <LoadingItem />
    </Box>
  )
}
