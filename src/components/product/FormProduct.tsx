import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Grid, Typography } from '@mui/joy'
import { useForm } from 'react-hook-form'
import FomFieldInput from '../form/FomFieldInput'
import FomFieldInputNumber from '../form/FomFieldInputNumber'
import FormTextArea from '../form/FormTextArea'
import { formSchema, ProductForm } from './FormSchema'
import FormFieldImage from '../form/FormFieldFile'

interface Props {
  defaultValues: ProductForm
  onSubmit: (_value: ProductForm) => void
}

const FormProduct = ({ defaultValues, onSubmit }: Props) => {
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
              <FomFieldInput
                name='title'
                form={form}
                label='Tiêu Đề'
                inputProps={{ placeholder: 'Nhập tên sản phẩm ' }}
              />
            </Grid>

            <Grid xs={12} lg={6}>
              <FomFieldInput
                name='slug'
                form={form}
                label='Link sản phẩm(Slug)'
                inputProps={{ placeholder: '/example' }}
              />
            </Grid>

            <Grid xs={12} lg={6}>
              <FomFieldInput
                name='material'
                form={form}
                label='Chất liệu'
                inputProps={{ placeholder: 'Nhựa, gỗ, ...' }}
              />
            </Grid>

            <Grid xs={12} lg={6}>
              <FomFieldInput name='price' form={form} label='Giá' inputProps={{ placeholder: '10.000.000' }} />
            </Grid>

            <Grid xs={12} lg={6}>
              <FomFieldInput name='quantity' form={form} label='Số lượng' inputProps={{ placeholder: '100' }} />
            </Grid>

            <Grid xs={12} lg={6}>
              <FomFieldInput
                name='itemNumber'
                form={form}
                label='Item Number'
                inputProps={{ placeholder: 'itemNumber' }}
              />
            </Grid>

            <Grid xs={12} lg={6}>
              <FomFieldInput name='finishing' form={form} label='Finishing' inputProps={{ placeholder: 'finishing' }} />
            </Grid>

            <Grid xs={12}>
              <FomFieldInput name='tags' form={form} label='Tags' inputProps={{ placeholder: 'tag1, tag2, ...' }} />
            </Grid>
          </Grid>
        </Grid>

        <Grid xs={12} lg={4} columns={12} container sx={{ height: 'max-content' }}>
          <Grid xs={12}>
            <Typography level='h4' component='h3'>
              Hình ảnh
            </Typography>

            <FormFieldImage name='mainPhotoFile' form={form} defaultPreviewImage={defaultValues.mainPhoto} />
          </Grid>

          <Grid xs={6}>
            <FomFieldInputNumber name='dimensionL' form={form} label='DimensionL' inputProps={{ placeholder: '10' }} />
          </Grid>

          <Grid xs={6}>
            <FomFieldInputNumber name='dimensionW' form={form} label='DimensionW' inputProps={{ placeholder: '10' }} />
          </Grid>

          <Grid xs={6}>
            <FomFieldInputNumber name='dimensionH' form={form} label='DimensionH' inputProps={{ placeholder: '10' }} />
          </Grid>

          <Grid xs={6}>
            <FomFieldInputNumber name='netWeight' form={form} label='NetWeight' inputProps={{ placeholder: '10' }} />
          </Grid>
        </Grid>
      </Grid>

      <Box mt={2}>
        <FormTextArea
          name='desc'
          form={form}
          label='Mô Tả'
          textAreaProps={{ placeholder: 'Toàn qúa đẹp khai, ...', minRows: 5 }}
        />
      </Box>

      <Box mt={4}>
        <Button sx={{ width: '100%' }} type='submit'>
          Save
        </Button>
      </Box>
    </form>
  )
}

export default FormProduct
