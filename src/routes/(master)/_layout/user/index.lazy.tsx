import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(master)/_layout/user/')({
  component: () => <div>Hello /(master)/_layout/user/!</div>
})
