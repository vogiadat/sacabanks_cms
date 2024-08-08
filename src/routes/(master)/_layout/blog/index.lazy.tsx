import { createLazyFileRoute } from '@tanstack/react-router'

import TextEditor from '@/components/base/TextEditor'
import 'ckeditor5/ckeditor5.css'

export const Route = createLazyFileRoute('/(master)/_layout/blog/')({
  component: () => <TextEditor />
})
