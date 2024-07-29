import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(master)/_layout/product/detail/$id')({
  component: () => <Page />
})

function Page() {
  const { id } = Route.useParams()
  return <div>id: {id}</div>
}
