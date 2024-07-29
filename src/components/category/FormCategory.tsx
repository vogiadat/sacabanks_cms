import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import FomFieldInput from '../form/FomFieldInput'
import FormDrawer from '../form/FormDrawer'
import FormFieldImage from '../form/FormFieldFile'
import { CategoryForm, formSchema } from './FormSchema'

interface Props {
  defaultValues: CategoryForm
  open: boolean
  setOpen: (open: boolean) => void
  onSubmit: (_value: CategoryForm) => void
  id?: string
  isLoading?: boolean
}

const FormCategory = ({ defaultValues, open, setOpen, onSubmit, id = '', isLoading = false }: Props) => {
  const isEdit = id ? true : false
  const form = useForm<CategoryForm>({
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
      isLoading={isLoading}
      isEdit={isEdit}
      id={id}
    >
      <FomFieldInput label='Tên hiển thị' inputProps={{ placeholder: 'nhập tên hiển thị' }} form={form} name='name' />
      <FormFieldImage form={form} name='image' label='Ảnh hiển thị' defaultPreviewImage={defaultValues.previewImage} />
    </FormDrawer>
  )
}

export default FormCategory
