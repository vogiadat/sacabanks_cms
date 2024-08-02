import { APP_MESSAGE, APP_RULE } from '@/constants'
import { z } from 'zod'

export const formSchema = z.object({
  title: z.string({ message: APP_MESSAGE.FORM.FIELD_INVALID }).min(1, { message: APP_MESSAGE.FORM.FIELD_REQUIRED }),
  slug: z.string({ message: APP_MESSAGE.FORM.FIELD_REQUIRED }).min(1, { message: APP_MESSAGE.FORM.FIELD_REQUIRED }),
  itemNumber: z
    .string({ message: APP_MESSAGE.FORM.FIELD_REQUIRED })
    .min(1, { message: APP_MESSAGE.FORM.FIELD_REQUIRED }),
  material: z.string({ message: APP_MESSAGE.FORM.FIELD_REQUIRED }).min(1, { message: APP_MESSAGE.FORM.FIELD_REQUIRED }),
  finishing: z
    .string({ message: APP_MESSAGE.FORM.FIELD_REQUIRED })
    .min(1, { message: APP_MESSAGE.FORM.FIELD_REQUIRED }),
  dimensionL: z.number({ message: APP_MESSAGE.FORM.FIELD_REQUIRED }),
  dimensionW: z.number({ message: APP_MESSAGE.FORM.FIELD_REQUIRED }),
  dimensionH: z.number({ message: APP_MESSAGE.FORM.FIELD_REQUIRED }),
  netWeight: z.number({ message: APP_MESSAGE.FORM.FIELD_REQUIRED }),
  price: z.number({ message: APP_MESSAGE.FORM.FIELD_REQUIRED }),
  quantity: z.number({ message: APP_MESSAGE.FORM.FIELD_REQUIRED }),
  mainPhoto: z.string({ message: APP_MESSAGE.FORM.FIELD_REQUIRED }),
  subPhotos: z.array(z.string().optional()).optional(),
  tags: z.string({ message: APP_MESSAGE.FORM.FIELD_REQUIRED }).nullable(),
  desc: z.string({ message: APP_MESSAGE.FORM.FIELD_REQUIRED }).nullable(),
  categoryId: z.string({ message: APP_MESSAGE.FORM.FIELD_REQUIRED }).optional(),
  listDetails: z.array(
    z.object({
      name: z.string({ message: APP_MESSAGE.FORM.FIELD_REQUIRED }),
      desc: z.string({ message: APP_MESSAGE.FORM.FIELD_REQUIRED }).optional()
    })
  ),

  mainPhotoFile: z
    .instanceof(File)
    .refine(
      (file) => file.size <= APP_RULE.FILE.MAX_FILE_SIZE,
      `${APP_MESSAGE.FILE.UPLOAD_LESS_THAN} ${APP_RULE.FILE.MAX_FILE_SIZE}`
    )
    .refine((file) => APP_RULE.FILE.ACCEPTED_IMAGE_TYPES.includes(file.type), APP_MESSAGE.FILE.INVALID_FILE_TYPE)
    .optional(),

  subPhotoFiles: z
    .array(
      z
        .instanceof(File)
        .refine(
          (file) => file.size <= APP_RULE.FILE.MAX_FILE_SIZE,
          `${APP_MESSAGE.FILE.UPLOAD_LESS_THAN} ${APP_RULE.FILE.MAX_FILE_SIZE}`
        )
        .refine((file) => APP_RULE.FILE.ACCEPTED_IMAGE_TYPES.includes(file.type), APP_MESSAGE.FILE.INVALID_FILE_TYPE)
    )
    .optional()
})

export type ProductForm = z.infer<typeof formSchema>

export const initProduct: ProductForm = {
  title: '',
  slug: '',
  itemNumber: '',
  material: '',
  finishing: '',
  dimensionL: 0,
  dimensionW: 0,
  dimensionH: 0,
  netWeight: 0,
  price: 0,
  quantity: 0,
  mainPhoto: '',
  tags: '',
  desc: '',
  categoryId: '',
  listDetails: []
}
