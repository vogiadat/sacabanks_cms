import { Box } from '@mui/joy'
import { LoadingItem } from '@/components/loading'

interface Props {
  isChild?: boolean
  backgroundColor?: string
}

export const LoadingFullPage = ({ isChild = false, backgroundColor = '#ddd' }: Props) => {
  return (
    <Box
      component={'div'}
      sx={{
        width: '100%',
        height: isChild ? '100%' : '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor,
        borderRadius: isChild ? '8px' : '0'
      }}
    >
      <LoadingItem />
    </Box>
  )
}
