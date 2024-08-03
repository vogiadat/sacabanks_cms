import {
  FormFieldImage,
  FormFieldInput,
  FormFieldInputPassword,
  FormTextArea
} from '@/components/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Grid } from '@mui/joy'
import { useForm } from 'react-hook-form'
import { formSchema, UserForm } from './FormSchema'
import { getUsernameFromEmail } from '@/utils'

interface Props {
  defaultValues: UserForm
  onSubmit: (_value: UserForm) => void
  isLoading?: boolean
}

const FormSupplier = ({ defaultValues, onSubmit, isLoading }: Props) => {
  const form = useForm<UserForm>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...defaultValues }
  })

  return (
    <form onSubmit={form.handleSubmit(onSubmit, console.log)}>
      <Grid rowSpacing={2} columnSpacing={4} container>
        <Grid rowSpacing={2} columnSpacing={4} container columns={12}>
          <Grid xs={12} lg={6}>
            <FormFieldInput
              name='email'
              form={form}
              label='Email'
              inputProps={{
                placeholder: 'Nhập email',
                onChange: (e) => {
                  const value = e.target.value
                  form.setValue('email', value)
                  form.setValue('username', getUsernameFromEmail(value))
                }
              }}
            />
          </Grid>

          <Grid xs={12} lg={6}>
            <FormFieldInputPassword
              name='password'
              label='Mật khẩu'
              form={form}
              inputProps={{ placeholder: '*******' }}
            />
          </Grid>

          <Grid xs={12} lg={6}>
            <FormFieldInput
              name='fullNameOwnerCompany'
              form={form}
              label='Chủ Doanh Nghiệp'
              inputProps={{ placeholder: 'Nhập chủ doanh nghiệp' }}
            />
          </Grid>

          <Grid xs={12} lg={6}>
            <FormFieldInput
              name='phoneNumber'
              form={form}
              label='Số Điện Thoại'
              inputProps={{ placeholder: 'Nhập số điện thoại' }}
            />
          </Grid>

          <Grid xs={12} lg={6}>
            <FormFieldInput
              name='companyName'
              form={form}
              label='Doanh Nghiệp'
              inputProps={{ placeholder: 'Nhập tên doanh nghiệp' }}
            />
          </Grid>

          <Grid xs={12} lg={6}>
            <FormFieldInput
              name='shortNameCompany'
              form={form}
              label='Tên Viết Tắt'
              inputProps={{ placeholder: 'Nhập tên doanh nghiệp viết tắt' }}
            />
          </Grid>

          <Grid xs={12}>
            <FormFieldInput
              name='linkWebsite'
              form={form}
              label='Website'
              inputProps={{ placeholder: 'Nhập link website' }}
            />
          </Grid>

          <Grid xs={12} lg={6}>
            <FormFieldInput
              name='implementerName'
              form={form}
              label='Người Triển Khai'
              inputProps={{ placeholder: 'Nhập tên người triển khai' }}
            />
          </Grid>

          <Grid xs={12} lg={6}>
            <FormFieldInput
              name='implementerPhone'
              form={form}
              label='Số Điện Thoại Người Triển Khai'
              inputProps={{
                placeholder: 'Nhập số điện thoại người triển khai'
              }}
            />
          </Grid>

          <Grid xs={12} lg={8}>
            <FormFieldImage
              name='bannerFile'
              form={form}
              label='Ảnh nền'
              defaultPreviewImage='banner'
            />
          </Grid>

          <Grid xs={12} lg={4}>
            <FormFieldImage
              name='avatarFile'
              form={form}
              label='Ảnh đại diện'
              defaultPreviewImage='avatar'
            />
          </Grid>
        </Grid>
      </Grid>

      <Box mt={2}>
        <FormTextArea
          name='description'
          form={form}
          label='Mô Tả Doanh Nghiệp'
          textAreaProps={{
            placeholder: 'Thêm mô tả cho doanh nghiệp',
            minRows: 5
          }}
        />
      </Box>

      <Box mt={4}>
        <Button loading={isLoading} sx={{ width: '100%' }} type='submit'>
          Duyệt Đơn
        </Button>
      </Box>
    </form>
  )
}

export default FormSupplier
