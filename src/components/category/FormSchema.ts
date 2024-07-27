import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE, REQUIRED_MESSAGE } from '@/utils/ErrorForm'
import { z } from 'zod'

export const formSchema = z.object({
  name: z.string({ message: REQUIRED_MESSAGE }).min(1, { message: REQUIRED_MESSAGE }),
  image: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, `File size should be less than 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    )
    .optional(),
  previewImage: z.string().optional()
})

export type CategoryForm = z.infer<typeof formSchema>

export const defaultValues: CategoryForm = {
  name: ''
}
