import { APP_MESSAGE, APP_RULE } from '@/constants'
import { z } from 'zod'

export const formSchemaImage = z
  .object({
    productId: z
      .string({ message: APP_MESSAGE.FORM.FIELD_REQUIRED })
      .min(1, { message: APP_MESSAGE.FORM.FIELD_REQUIRED }),
    image: z
      .instanceof(File)
      .refine(
        (file) => file.size <= APP_RULE.FILE.MAX_FILE_SIZE,
        `${APP_MESSAGE.FILE.UPLOAD_LESS_THAN} ${APP_RULE.FILE.MAX_FILE_SIZE}`
      )
      .refine(
        (file) => APP_RULE.FILE.ACCEPTED_IMAGE_TYPES.includes(file.type),
        APP_MESSAGE.FILE.INVALID_FILE_TYPE
      )
      .optional(),
    photoUrl: z.string().optional()
  })
  .refine((data) => !!data.image, {
    message: APP_MESSAGE.FILE.UPLOAD_REQUIRED,
    path: ['image']
  })

export type ImageForm = z.infer<typeof formSchemaImage>

export const defaultValues: ImageForm = {
  productId: ''
}
