import { APP_MESSAGE } from '@/constants'
import { z } from 'zod'

export const formSchema = z.object({
  username: z.string(),
  email: z
    .string()
    .email({ message: APP_MESSAGE.FORM.EMAIL_INVALID })
    .min(1, { message: APP_MESSAGE.FORM.FIELD_REQUIRED }),
  password: z
    .string({ message: APP_MESSAGE.FORM.FIELD_REQUIRED })
    .min(3, { message: APP_MESSAGE.FORM.FIELD_REQUIRED }),
  phoneNumber: z
    .string({ message: APP_MESSAGE.FORM.FIELD_REQUIRED })
    .regex(/^(\s?\d{3}\s?\d{4})|(\s?\d{1,4}\s?\d{1,4}\s?\d{1,4})$/, {
      message: APP_MESSAGE.FORM.PHONE_INVALID
    }),
  address: z.string({ message: APP_MESSAGE.FORM.FIELD_REQUIRED }).optional(),
  role: z
    .string({ message: APP_MESSAGE.FORM.FIELD_REQUIRED })
    .min(1, { message: APP_MESSAGE.FORM.FIELD_REQUIRED })
})

export type UserFormSchema = z.infer<typeof formSchema>

export const defaultValues: UserFormSchema = {
  username: '',
  email: '',
  password: '',
  phoneNumber: '',
  address: '',
  role: ''
}
