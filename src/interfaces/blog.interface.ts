import { IBaseItem } from '@/interfaces'

export interface IBlog extends IBaseItem {
  content: string
  title: string
  focusKeywords?: string[] | null
  slug: string
}
