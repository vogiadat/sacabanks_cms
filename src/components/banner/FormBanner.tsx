import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FormFieldInput, FormDrawer, FormFieldImage } from '@/components/form'
import { BannerForm, formSchema } from './FormSchema'

interface Props {
  defaultValues: BannerForm
  open: boolean
  setOpen: (open: boolean) => void
  onSubmit: (_value: BannerForm) => void
}

const FormBanner = ({ defaultValues, open, setOpen, onSubmit }: Props) => {
  const form = useForm<BannerForm>({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  const handleCloseModal = () => {
    form.reset()
    setOpen(!open)
  }

  return (
    <FormDrawer
      open={open}
      onSubmit={onSubmit}
      form={form}
      onClose={handleCloseModal}
    >
      <FormFieldInput
        label='Tên hiển thị'
        inputProps={{ placeholder: 'nhập tên hiển thị' }}
        form={form}
        name='name'
      />
      <FormFieldImage
        form={form}
        name='image'
        label='Ảnh hiển thị'
        defaultPreviewImage={'previewImage'}
      />
    </FormDrawer>
  )
}

export default FormBanner
