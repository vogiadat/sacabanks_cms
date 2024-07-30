import { APP_MESSAGE } from '@/constants'
import { z } from 'zod'

export const formSchema = z.object({
  username: z.string(),
  password: z.string({ message: APP_MESSAGE.FORM.FIELD_REQUIRED }).min(3, { message: APP_MESSAGE.FORM.FIELD_REQUIRED }),
  companyName: z.string({ message: APP_MESSAGE.FORM.FIELD_REQUIRED }),
  address: z.string().optional(),
  email: z.string({ message: APP_MESSAGE.FORM.FIELD_REQUIRED }),
  phoneNumber: z.string({ message: APP_MESSAGE.FORM.FIELD_REQUIRED }),
  fullNameOwnerCompany: z.string({ message: APP_MESSAGE.FORM.FIELD_REQUIRED }),
  companyGroup: z.string().optional(),
  mainProductGroup: z.string().optional(),
  numberProductService: z.string().optional(),
  revenueEachYear: z.string().optional(),
  description: z.string().optional(),
  listCertificate: z.string().optional(),
  listLinkProduct: z.string().optional(),
  companyWishesCooperate: z.string().optional(),
  linkProfile: z.string().optional(),
  implementerName: z.string().optional(),
  implementerPhone: z.string().optional(),
  linkWebsite: z.string().optional(),
  shortNameCompany: z.string().optional(),
  collab: z.string().optional(),
  profits: z.string().optional(),
  isActive: z.boolean().optional(),
  //! Api error value
  phone: z.string().optional()
})

export type ActiveUserFormSchema = z.infer<typeof formSchema>

export const initActiveUser: ActiveUserFormSchema = {
  username: '',
  password: '',
  companyName: '',
  address: '',
  email: '',
  phoneNumber: '',
  phone: '',
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
  collab: '',
  profits: '',
  isActive: false
}
