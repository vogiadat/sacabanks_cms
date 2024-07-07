import { CssBaseline, CssVarsProvider } from '@mui/joy'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

import { extendTheme } from '@mui/joy/styles'

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          500: '#253d83',
          600: '#2f4da7'
        }
      }
    }
  }
})

export const Route = createRootRoute({
  component: () => (
    <>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        <Outlet />
      </CssVarsProvider>
      <TanStackRouterDevtools />
    </>
  )
})
