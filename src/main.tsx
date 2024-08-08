import '@fontsource/inter'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import ReactDOM from 'react-dom/client'
import { routeTree } from './routeTree.gen'
import { NotFoundPage } from './routes/(master)/_layout/not-found/index.lazy'

import './App.css'

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFoundPage
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
)
