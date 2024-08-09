import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import FormBlog from '@/components/blog/FormBlog'
import { BlogForm, initBlog } from '@/components/blog/FormSchema'
import { Box, Stack, Typography } from '@mui/joy'
import { blogApi, uploadApi } from '@/apis'
import { useMutation } from '@tanstack/react-query'
import { showToastError, showToastQuerySuccess } from '@/utils'

export const Route = createLazyFileRoute('/(master)/_layout/blog/create')({
  component: Page
})

function Page() {
  const { isPending: loadingFile, mutateAsync: upload } = useMutation({
    mutationFn: (data: { file: File }) =>
      uploadApi.create(data, 'multipart/form-data')
  })
  const { mutateAsync, isPending: loadingSubmit } = useMutation({
    mutationFn: (data: BlogForm) => blogApi.create(data)
  })

  const navigate = useNavigate()

  const handleSubmit = async (_value: BlogForm) => {
    // console.log(_value)

    if (_value.imageFile) {
      await upload({ file: _value.imageFile })
        .then((res) => (_value.image = res.data.data))
        .catch(showToastError)
    }

    await mutateAsync(_value)
      .then((data) => {
        showToastQuerySuccess('ADD_SUCCESS')(data)
        navigate({ to: '/blog' })
      })
      .catch(showToastError)
  }

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
        <FormBlog
          defaultValues={initBlog}
          onSubmit={handleSubmit}
          isLoading={loadingFile || loadingSubmit}
        />
      </Box>
    </>
  )
}
