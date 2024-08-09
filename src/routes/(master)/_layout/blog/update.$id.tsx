import { Box, Typography } from '@mui/joy'
import { createFileRoute, useRouter } from '@tanstack/react-router'

import { blogApi, uploadApi } from '@/apis'
import FormBlog from '@/components/blog/FormBlog'
import { BlogForm } from '@/components/blog/FormSchema'
import { getImageById, showToastError, showToastQuerySuccess } from '@/utils'
import { Stack } from '@mui/joy'
import { useMutation, useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/(master)/_layout/blog/update/$id')({
  component: Page
})

function Page() {
  const { id } = Route.useParams()
  const { navigate } = useRouter()

  const { isPending: loadingFile, mutateAsync: upload } = useMutation({
    mutationFn: (data: { file: File }) =>
      uploadApi.create(data, 'multipart/form-data')
  })

  const { data } = useQuery({
    queryKey: blogApi.getKey('findById', { id }),
    queryFn: () => blogApi.findById(id)
  })

  const { mutateAsync, isPending: loadingSubmit } = useMutation({
    mutationFn: (data: BlogForm & { id: string }) =>
      blogApi.patch(data.id, data)
  })

  const blog = data?.data.data

  const handleSubmit = async (_value: BlogForm) => {
    _value.image = blog?.image

    if (_value.imageFile) {
      await upload({ file: _value.imageFile })
        .then((res) => (_value.image = res.data.data))
        .catch(showToastError)
    }

    await mutateAsync({ ..._value, id })
      .then((data) => {
        showToastQuerySuccess('UPDATE_SUCCESS')(data)
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
        {blog && (
          <FormBlog
            defaultValues={{
              ...blog,
              focusKeywords: blog.focusKeywords || [],
              image: getImageById(blog.image)
            }}
            onSubmit={handleSubmit}
            isLoading={loadingFile || loadingSubmit}
          />
        )}
      </Box>
    </>
  )
}
