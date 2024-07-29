import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { CssBaseline, CssVarsProvider } from '@mui/joy'
import { extendTheme } from '@mui/joy/styles'

import { APP_CONFIG } from '@/constants'
import { Toaster } from 'sonner'

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

const queryClient = new QueryClient()

export const Route = createRootRoute({
  component: () => {
    console.log('🚀 ~ APP_CONFIG.BASE_URL.API:', APP_CONFIG.BASE_URL.API)
    return (
      <>
        <QueryClientProvider client={queryClient}>
          <CssVarsProvider theme={theme}>
            <CssBaseline />
            <Outlet />
          </CssVarsProvider>
          {/* expand={false} */}
          <Toaster richColors position='top-center' duration={3000} />
          <TanStackRouterDevtools />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </>
    )
  }
})
