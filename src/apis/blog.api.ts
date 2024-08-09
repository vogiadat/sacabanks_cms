import { BaseApi } from '@/apis'
import { IBlog } from '@/interfaces/blog.interface'

class BlogApi extends BaseApi<IBlog> {
  constructor() {
    super('blog')
  }
}

export const blogApi = new BlogApi()
