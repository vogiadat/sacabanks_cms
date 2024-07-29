import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(master)/_layout/active-user/')({
  component: () => <div>Hello /(master)/_layout/active-user/!</div>
})
