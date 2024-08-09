import { APP_MESSAGE, APP_RULE } from '@/constants'
import { z } from 'zod'

export const formSchema = z.object({
  content: z
    .string({ message: APP_MESSAGE.FORM.FIELD_INVALID })
    .min(1, { message: APP_MESSAGE.FORM.FIELD_REQUIRED }),
  title: z
    .string({ message: APP_MESSAGE.FORM.FIELD_REQUIRED })
    .min(1, { message: APP_MESSAGE.FORM.FIELD_REQUIRED }),
  slug: z
    .string({ message: APP_MESSAGE.FORM.FIELD_REQUIRED })
    .min(1, { message: APP_MESSAGE.FORM.FIELD_REQUIRED }),
  shortDesc: z
    .string({ message: APP_MESSAGE.FORM.FIELD_REQUIRED })
    .min(1, { message: APP_MESSAGE.FORM.FIELD_REQUIRED }),
  focusKeywords: z.array(z.string().nullable().optional()),
  image: z
    .string({ message: APP_MESSAGE.FORM.FIELD_REQUIRED })
    .optional()
    .nullable(),

  imageFile: z
    .instanceof(File)
    .refine(
      (file) => file.size <= APP_RULE.FILE.MAX_FILE_SIZE,
      `${APP_MESSAGE.FILE.UPLOAD_LESS_THAN} ${APP_RULE.FILE.MAX_FILE_SIZE}`
    )
    .refine(
      (file) => APP_RULE.FILE.ACCEPTED_IMAGE_TYPES.includes(file.type),
      APP_MESSAGE.FILE.INVALID_FILE_TYPE
    )
    .optional()
})

export type BlogForm = z.infer<typeof formSchema>

export const initBlog: BlogForm = {
  title: '',
  slug: '',
  content: '',
  shortDesc: '',
  focusKeywords: []
}
