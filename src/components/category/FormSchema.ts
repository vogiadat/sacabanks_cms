import { APP_MESSAGE, APP_RULE } from '@/constants'
import { z } from 'zod'

export const formSchema = z.object({
  name: z.string({ message: APP_MESSAGE.FORM.FIELD_REQUIRED }).min(1, { message: APP_MESSAGE.FORM.FIELD_REQUIRED }),
  image: z
    .instanceof(File)
    .refine((file) => file.size <= APP_RULE.FILE.MAX_FILE_SIZE, `File size should be less than 5MB.`)
    .refine(
      (file) => APP_RULE.FILE.ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    )
    .optional(),
  previewImage: z.string().optional()
})

export type CategoryForm = z.infer<typeof formSchema>

export const defaultValues: CategoryForm = {
  name: ''
}
