import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Checkbox, Chip, Divider, Grid, Typography } from '@mui/joy'
import { useForm } from 'react-hook-form'

import { checkSomeBoolean, generateSlug } from '@/utils'

import { categoryApi } from '@/apis'
import { FormFieldImage, FormFieldInput, FormFieldInputNumber, FormFieldSelect, FormTextArea } from '@/components/form'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { ProductForm, formSchema } from './FormSchema'

interface Props {
  defaultValues: ProductForm
  onSubmit: (_value: ProductForm) => void
  isLoading?: boolean
}

const FormProduct = ({ defaultValues, onSubmit, isLoading }: Props) => {
  const { data: categoryData } = useQuery({
    queryKey: categoryApi.getKey('getList'),
    queryFn: () => categoryApi.getList()
  })

  const categoryList = categoryData?.data.data ?? []

  const [showOptions, setShowOptions] = useState<boolean>(
    checkSomeBoolean([
      defaultValues.price,
      defaultValues.quantity,
      defaultValues.dimensionL,
      defaultValues.dimensionW,
      defaultValues.dimensionH,
      defaultValues.netWeight
    ])
  )

  const form = useForm<ProductForm>({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  const userRoleSelect = categoryList.map((item) => ({
    value: item.id,
    label: item.name
  }))

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked
    setShowOptions(checked)

    if (!checked) {
      form.setValue('price', defaultValues.price)
      form.setValue('quantity', defaultValues.quantity)
      form.setValue('dimensionL', defaultValues.dimensionL)
      form.setValue('dimensionW', defaultValues.dimensionW)
      form.setValue('dimensionH', defaultValues.dimensionH)
      form.setValue('netWeight', defaultValues.netWeight)
    }
  }

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

            <FormFieldImage label='Ảnh chính' name='mainPhotoFile' form={form} defaultPreviewImage={'mainPhoto'} />
          </Grid>

          {/* <Grid xs={12}>
            <FormFieldMultipleImages
              label='Ảnh phụ (chọn nhiều)'
              form={form}
              name='subPhotoFiles'
              defaultPreviewImages='subPhotos' // or the field where you store the image previews
            />
          </Grid> */}
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

      <Box>
        <Checkbox label='Thêm tùy chọn' onChange={handleCheckboxChange} checked={showOptions} />
      </Box>

      {showOptions && (
        <Grid rowSpacing={2} columnSpacing={4} container columns={12}>
          <Grid xs={12}>
            <Divider>
              <Chip variant='soft' color='neutral' size='sm'>
                Tùy chọn
              </Chip>
            </Divider>
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
      )}

      <Box mt={4}>
        <Button loading={isLoading} sx={{ width: '100%' }} type='submit'>
          Save
        </Button>
      </Box>
    </form>
  )
}

export default FormProduct
