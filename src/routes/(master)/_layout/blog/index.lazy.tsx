import TextEditor from '@/components/base/TextEditor'
import { Box, Stack, Typography } from '@mui/joy'
import { createLazyFileRoute } from '@tanstack/react-router'

import 'ckeditor5/ckeditor5.css'

export const Route = createLazyFileRoute('/(master)/_layout/blog/')({
  component: Page
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
          Bài viết
        </Typography>

        <Stack
          direction='row'
          justifyContent='center'
          alignItems='center'
          spacing={1}
        ></Stack>
      </Box>
      <Box
        component='div'
        sx={{
          height: '100%',
          overflow: 'scroll',
          overflowX: 'hidden'
        }}
        className='custom-scrollbar'
      >
        <TextEditor />
      </Box>
    </>
  )
}
