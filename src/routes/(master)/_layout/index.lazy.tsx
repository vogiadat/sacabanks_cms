import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(master)/_layout/')({
  component: () => {
    return <></>
  }
})
