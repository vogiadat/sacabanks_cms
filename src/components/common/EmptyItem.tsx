import { Box, Typography } from '@mui/joy'

interface Props {
  text?: string
  image?: string
}

export const EmptyItem = ({ image, text = 'Không có dữ liệu' }: Props) => (
  <Box
    sx={{
      textAlign: 'center'
    }}
  >
    {image && (
      <Box
        sx={{
          width: '100%',
          height: '300px',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginX: 'auto',
          overflow: 'hidden',
          backgroundColor: 'background.level1'
        }}
      >
        <img
          src={image}
          alt='empty_data'
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '16px',
            objectFit: 'cover'
          }}
        />
      </Box>
    )}
    {text && (
      <Typography level='h3' color='neutral'>
        {text}
      </Typography>
    )}
  </Box>
)
