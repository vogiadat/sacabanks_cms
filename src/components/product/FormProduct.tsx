import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Grid, Typography } from '@mui/joy'
import { useForm } from 'react-hook-form'

import { generateSlug } from '@/utils'

import { FormFieldImage, FormFieldInput, FormFieldInputNumber, FormFieldSelect, FormTextArea } from '@/components/form'
import { formSchema, ProductForm } from './FormSchema'
import { RoleMap } from '@/types'

interface Props {
  defaultValues: ProductForm
  onSubmit: (_value: ProductForm) => void
  isLoading?: boolean
}

const FormProduct = ({ defaultValues, onSubmit, isLoading }: Props) => {
  const form = useForm<ProductForm>({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  const userRoleSelect = Object.entries(RoleMap).map(([key, value]) => ({
    value: key,
    label: value
  }))

  return (
    <form onSubmit={form.handleSubmit(onSubmit, console.log)}>
      <Grid rowSpacing={2} columnSpacing={4} container>
        <Grid xs={12} lg={8}>
          <Grid rowSpacing={2} columnSpacing={4} container columns={12}>
            <Grid xs={12} lg={6}>
              <FormFieldInput
                name='title'
                form={form}
                label='Tên Sản Phẩm'
                inputProps={{
                  placeholder: 'Nhập tên sản phẩm ',
                  onChange: (e) => {
                    const value = e.target.value
                    form.setValue('title', value)
                    form.setValue('slug', generateSlug(value))
                  }
                }}
              />
            </Grid>

            <Grid xs={12} lg={6}>
              <FormFieldInput
                name='itemNumber'
                form={form}
                label='Mã Sản Phẩm'
                inputProps={{ placeholder: 'Nhập mã sản phẩm' }}
              />
            </Grid>

            <Grid xs={12} lg={6}>
              <FormFieldInput
                name='slug'
                form={form}
                label='Đường Dẫn Sản Phẩm'
                inputProps={{ placeholder: 'Đường dẫn sản phẩm', disabled: true }}
              />
            </Grid>

            <Grid xs={12} lg={6}>
              <FormFieldSelect
                label='Danh Mục'
                form={form}
                name='categoryId'
                items={userRoleSelect}
                selectProps={{
                  placeholder: 'Chọn danh mục'
                }}
              />
            </Grid>

            <Grid xs={12} lg={6}>
              <FormFieldInput
                name='material'
                form={form}
                label='Chất liệu'
                inputProps={{ placeholder: 'VD: Nhựa, gỗ, ...' }}
              />
            </Grid>
            <Grid xs={12} lg={6}>
              <FormFieldInput
                name='finishing'
                form={form}
                label='Độ Hoàn Thiện'
                inputProps={{ placeholder: 'Trạng thái hoàn thiện của sản phẩm' }}
              />
            </Grid>

            <Grid xs={12}>
              <FormFieldInput
                name='tags'
                form={form}
                label='Nhãn'
                inputProps={{ placeholder: 'VD: Nhãn 1, nhãn 2, ...' }}
              />
            </Grid>
          </Grid>
        </Grid>

        {/*//SECTION: Image */}
        <Grid xs={12} lg={4} columns={12} container sx={{ height: 'max-content' }}>
          <Grid xs={12}>
            <Typography level='h4' component='h3' mt={{ xs: 0, lg: -1.5 }}>
              Hình ảnh
            </Typography>

            <FormFieldImage name='mainPhotoFile' form={form} defaultPreviewImage={'mainPhoto'} />
          </Grid>
        </Grid>
      </Grid>

      <Box my={2}>
        <FormTextArea
          name='desc'
          form={form}
          label='Mô Tả'
          textAreaProps={{ placeholder: 'Thêm mô tả cho sản phẩm của bạn', minRows: 5 }}
        />
      </Box>

      <Grid rowSpacing={2} columnSpacing={4} container columns={12}>
        <Grid xs={12}>
          <Typography level='h4' component='h3'>
            Tùy Chọn
          </Typography>
        </Grid>
        <Grid xs={12} lg={6}>
          <FormFieldInputNumber name='price' form={form} label='Giá' />
        </Grid>

        <Grid xs={12} lg={6}>
          <FormFieldInputNumber name='quantity' form={form} label='Số lượng' />
        </Grid>

        <Grid xs={12} lg={6}>
          <FormFieldInputNumber name='dimensionL' form={form} label='Chiều Dài' inputProps={{ placeholder: '10' }} />
        </Grid>

        <Grid xs={12} lg={6}>
          <FormFieldInputNumber name='dimensionW' form={form} label='Chiều Rộng' inputProps={{ placeholder: '10' }} />
        </Grid>

        <Grid xs={12} lg={6}>
          <FormFieldInputNumber name='dimensionH' form={form} label='Chiều Cao' inputProps={{ placeholder: '10' }} />
        </Grid>

        <Grid xs={12} lg={6}>
          <FormFieldInputNumber name='netWeight' form={form} label='Khối Lượng' inputProps={{ placeholder: '10' }} />
        </Grid>
      </Grid>

      <Box mt={4}>
        <Button loading={isLoading} sx={{ width: '100%' }} type='submit'>
          Save
        </Button>
      </Box>
    </form>
  )
}

export default FormProduct
