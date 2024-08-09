import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Grid, Stack } from '@mui/joy'
import { useForm } from 'react-hook-form'
import { FormFieldImage, FormFieldInput, FormTextArea } from '../form'
import { FormFieldTextEditor } from '../form/FormFieldTextEditor'
import { BlogForm, formSchema } from './FormSchema'
import FormTags from './FormTags'

interface Props {
  defaultValues: BlogForm
  onSubmit: (_value: BlogForm) => void
  isLoading?: boolean
}

const FormBlog = ({ defaultValues, onSubmit, isLoading }: Props) => {
  const form = useForm<BlogForm>({
    resolver: zodResolver(formSchema),
    defaultValues
  })
  return (
    <form onSubmit={form.handleSubmit(onSubmit, console.log)}>
      <Grid rowSpacing={2} columnSpacing={4} container>
        <Grid xs={12}>
          <FormFieldInput name='title' form={form} label='Tiêu đề hiển thị' />
        </Grid>

        <Grid xs={12} lg={6}>
          <FormFieldInput
            name='slug'
            form={form}
            label='Link tới trang'
            inputProps={{
              startDecorator: (
                <Button color='neutral'>sacabanks.com/bai-viet/</Button>
              )
            }}
          />
        </Grid>

        <Grid xs={12} lg={6}>
          <FormTags form={form} />
        </Grid>

        <Grid xs={12}>
          <FormTextArea
            name='shortDesc'
            form={form}
            label='Mô tả ngắn'
            textAreaProps={{
              placeholder: 'Thêm mô tả cho cho bài viết',
              minRows: 3
            }}
          />
        </Grid>

        <Grid xs={12}>
          <FormFieldImage
            form={form}
            name='imageFile'
            label='Ảnh hiển thị'
            defaultPreviewImage={'image'}
          />
        </Grid>

        <Grid xs={12}>
          <FormFieldTextEditor
            name='content'
            form={form}
            label='Nội dung trang chính'
          />
        </Grid>
      </Grid>

      <Stack mt={2} justifyContent={'end'} direction={'row'}>
        <Button loading={isLoading} size='lg' type='submit'>
          Lưu lại
        </Button>
      </Stack>
    </form>
  )
}

export default FormBlog
