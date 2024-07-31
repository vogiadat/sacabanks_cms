import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Grid, Typography } from '@mui/joy'
import { useForm } from 'react-hook-form'
import { FormFieldInput, FormFieldInputNumber, FormFieldImage, FormTextArea } from '@/components/form'
import { formSchema, ProductForm } from './FormSchema'

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

  return (
    <form onSubmit={form.handleSubmit(onSubmit, console.log)}>
      <Grid rowSpacing={2} columnSpacing={4} container>
        <Grid xs={12} lg={8}>
          <Grid rowSpacing={2} columnSpacing={4} container columns={12}>
            <Grid xs={12}>
              <FormFieldInput
                name='title'
                form={form}
                label='Tên Sản Phẩm'
                inputProps={{ placeholder: 'Nhập tên sản phẩm ' }}
              />
            </Grid>

            <Grid xs={12} lg={6}>
              <FormFieldInput
                name='slug'
                form={form}
                label='Đường Dẫn Sản Phẩm'
                inputProps={{ placeholder: '/example' }}
              />
            </Grid>

            <Grid xs={12} lg={6}>
              <FormFieldInput
                name='material'
                form={form}
                label='Chất liệu'
                inputProps={{ placeholder: 'Nhựa, gỗ, ...' }}
              />
            </Grid>

            <Grid xs={12} lg={6}>
              <FormFieldInput name='price' form={form} label='Giá' inputProps={{ type: 'number' }} />
            </Grid>

            <Grid xs={12} lg={6}>
              <FormFieldInput name='quantity' form={form} label='Số lượng' inputProps={{ type: 'number' }} />
            </Grid>

            <Grid xs={12} lg={6}>
              <FormFieldInput
                name='itemNumber'
                form={form}
                label='Item Number'
                inputProps={{ placeholder: 'itemNumber' }}
              />
            </Grid>

            <Grid xs={12} lg={6}>
              <FormFieldInput
                name='finishing'
                form={form}
                label='Độ Hoàn Thiện'
                inputProps={{ placeholder: 'finishing' }}
              />
            </Grid>

            <Grid xs={12}>
              <FormFieldInput name='tags' form={form} label='Tags' inputProps={{ placeholder: 'tag1, tag2, ...' }} />
            </Grid>
          </Grid>
        </Grid>

        {/*//SECTION: Image */}
        <Grid xs={12} lg={4} columns={12} container sx={{ height: 'max-content' }}>
          <Grid xs={12}>
            <Typography level='h4' component='h3'>
              Hình ảnh
            </Typography>

            <FormFieldImage name='mainPhotoFile' form={form} defaultPreviewImage={'mainPhoto'} />
          </Grid>

          <Grid xs={6}>
            <FormFieldInputNumber name='dimensionL' form={form} label='DimensionL' inputProps={{ placeholder: '10' }} />
          </Grid>

          <Grid xs={6}>
            <FormFieldInputNumber name='dimensionW' form={form} label='DimensionW' inputProps={{ placeholder: '10' }} />
          </Grid>

          <Grid xs={6}>
            <FormFieldInputNumber name='dimensionH' form={form} label='DimensionH' inputProps={{ placeholder: '10' }} />
          </Grid>

          <Grid xs={6}>
            <FormFieldInputNumber name='netWeight' form={form} label='NetWeight' inputProps={{ placeholder: '10' }} />
          </Grid>
        </Grid>
      </Grid>

      <Box mt={2}>
        <FormTextArea
          name='desc'
          form={form}
          label='Mô Tả'
          textAreaProps={{ placeholder: 'Thêm mô tả cho sản phẩm của bạn', minRows: 5 }}
        />
      </Box>

      <Box mt={4}>
        <Button loading={isLoading} sx={{ width: '100%' }} type='submit'>
          Save
        </Button>
      </Box>
    </form>
  )
}

export default FormProduct
