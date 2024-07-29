import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(master)/_layout/supplier/')({
  component: () => <div>Hello /(master)/_layout/supplier/!</div>
})
