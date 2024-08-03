import { z } from 'zod'

import { APP_MESSAGE } from '@/constants'

export const schema = z.object({
  email: z
    .string()
    .email({ message: APP_MESSAGE.FORM.EMAIL_INVALID })
    .min(1, { message: APP_MESSAGE.FORM.FIELD_REQUIRED }),
  phoneNumber: z.string().min(1, { message: APP_MESSAGE.FORM.FIELD_REQUIRED }),
  password: z.string().min(1, { message: APP_MESSAGE.FORM.FIELD_REQUIRED }),
  confirmPassword: z
    .string()
    .min(1, { message: APP_MESSAGE.FORM.FIELD_REQUIRED }),

  createdAt: z.string(),
  updatedAt: z.string()
})

// * Auth Schema
export const loginSchema = schema.pick({ email: true, password: true })

export const registerSchema = schema
  .pick({
    email: true,
    phoneNumber: true,
    password: true,
    confirmPassword: true
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: APP_MESSAGE.FORM.CONFIRM_PASSWORD_NOT_MATCH,
    path: ['confirmPassword']
  })
// * END Auth Schema
