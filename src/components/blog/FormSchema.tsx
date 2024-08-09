import { APP_MESSAGE } from '@/constants'
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
  focusKeywords: z.array(z.string().nullable().optional())
})

export type BlogForm = z.infer<typeof formSchema>

export const initBlog: BlogForm = {
  title: '',
  slug: '',
  content: '',
  focusKeywords: []
}
