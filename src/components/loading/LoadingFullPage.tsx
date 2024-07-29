import { Box } from '@mui/joy'
import { LoadingItem } from '@/components/loading'

interface Props {
  isChild?: boolean
}

export const LoadingFullPage = ({ isChild = false }: Props) => {
  return (
    <Box
      component={'div'}
      sx={{
        width: '100%',
        height: isChild ? '100%' : '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ddd',
        borderRadius: isChild ? '8px' : '0'
      }}
    >
      <LoadingItem />
    </Box>
  )
}
