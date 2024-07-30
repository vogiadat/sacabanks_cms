import { APP_MESSAGE } from '@/constants'
import { z } from 'zod'

export const formSchema = z.object({
  username: z.string(),
  email: z
    .string()
    .email({ message: APP_MESSAGE.FORM.EMAIL_INVALID })
    .min(1, { message: APP_MESSAGE.FORM.FIELD_REQUIRED }),
  password: z.string({ message: APP_MESSAGE.FORM.FIELD_REQUIRED }).min(3, { message: APP_MESSAGE.FORM.FIELD_REQUIRED }),
  phoneNumber: z
    .string({ message: APP_MESSAGE.FORM.FIELD_REQUIRED })
    .min(8, { message: APP_MESSAGE.FORM.FIELD_REQUIRED })
    .max(10, { message: APP_MESSAGE.FORM.FIELD_REQUIRED }),
  address: z.string({ message: APP_MESSAGE.FORM.FIELD_REQUIRED }).optional(),
  role: z.string({ message: APP_MESSAGE.FORM.FIELD_REQUIRED }).min(1, { message: APP_MESSAGE.FORM.FIELD_REQUIRED })
})

export type UserForm = z.infer<typeof formSchema>

export const defaultValues: UserForm = {
  username: '',
  email: '',
  password: '',
  phoneNumber: '',
  address: '',
  role: ''
}
