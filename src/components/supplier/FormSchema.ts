import { APP_MESSAGE, APP_RULE } from '@/constants'
import { CollabEnum, ProfitsEnum, RoleEnum } from '@/types'
import { z } from 'zod'

export const formSchema = z.object({
  username: z
    .string({ message: APP_MESSAGE.FORM.FIELD_REQUIRED })
    .min(1, { message: APP_MESSAGE.FORM.FIELD_REQUIRED }),
  email: z
    .string({ message: APP_MESSAGE.FORM.FIELD_REQUIRED })
    .min(1, { message: APP_MESSAGE.FORM.FIELD_REQUIRED })
    .email({ message: APP_MESSAGE.FORM.EMAIL_INVALID }),
  password: z
    .string({ message: APP_MESSAGE.FORM.FIELD_REQUIRED })
    .min(3, { message: APP_MESSAGE.FORM.FIELD_REQUIRED })
    .nullable(),
  phoneNumber: z
    .string({ message: APP_MESSAGE.FORM.FIELD_REQUIRED })
    .min(1, { message: APP_MESSAGE.FORM.FIELD_REQUIRED }),
  role: z.nativeEnum(RoleEnum, { message: APP_MESSAGE.FORM.FIELD_REQUIRED }),
  companyName: z
    .string({ message: APP_MESSAGE.FORM.FIELD_REQUIRED })
    .min(1, { message: APP_MESSAGE.FORM.FIELD_REQUIRED }),
  address: z.string().optional().nullable(),
  fullNameOwnerCompany: z
    .string({ message: APP_MESSAGE.FORM.FIELD_REQUIRED })
    .min(1, { message: APP_MESSAGE.FORM.FIELD_REQUIRED }),
  companyGroup: z.string().optional().nullable(),
  mainProductGroup: z.string().optional().nullable(),
  numberProductService: z.string().optional().nullable(),
  revenueEachYear: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  listCertificate: z.string().optional().nullable(),
  listLinkProduct: z.string().optional().nullable(),
  companyWishesCooperate: z.string().optional().nullable(),
  linkProfile: z.string().optional().nullable(),
  implementerName: z.string().optional().nullable(),
  implementerPhone: z.string().optional().nullable(),
  linkWebsite: z.string().optional().nullable(),
  shortNameCompany: z.string().optional().nullable(),
  collab: z.nativeEnum(CollabEnum).optional().nullable(),
  profits: z.nativeEnum(ProfitsEnum).optional().nullable(),
  isActive: z.boolean().optional().nullable(),
  avatar: z
    .string({ message: APP_MESSAGE.FORM.FIELD_REQUIRED })
    .optional()
    .nullable(),
  banner: z
    .string({ message: APP_MESSAGE.FORM.FIELD_REQUIRED })
    .optional()
    .nullable(),

  avatarFile: z
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

  bannerFile: z
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

  //! Api error value
})

export type UserForm = z.infer<typeof formSchema>

export const initUserForm: UserForm = {
  username: '',
  password: '',
  companyName: '',
  address: '',
  email: '',
  phoneNumber: '',
  fullNameOwnerCompany: '',
  companyGroup: '',
  mainProductGroup: '',
  numberProductService: '',
  revenueEachYear: '',
  description: '',
  listCertificate: '',
  listLinkProduct: '',
  companyWishesCooperate: '',
  linkProfile: '',
  implementerName: '',
  implementerPhone: '',
  linkWebsite: '',
  shortNameCompany: '',
  isActive: false,
  role: RoleEnum.SUPPER_ADMIN
}
