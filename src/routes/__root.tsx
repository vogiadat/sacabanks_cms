import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

import { CssBaseline, CssVarsProvider } from '@mui/joy'
import { extendTheme } from '@mui/joy/styles'

import { APP_CONFIG } from '@/constants'
import { useEffect } from 'react'

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
          <TanStackRouterDevtools />
        </QueryClientProvider>
      </>
    )
  }
})
