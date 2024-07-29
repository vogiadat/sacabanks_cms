import Box from '@mui/joy/Box'
import Breadcrumbs from '@mui/joy/Breadcrumbs'
import Link from '@mui/joy/Link'
import Typography from '@mui/joy/Typography'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'

import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/sidebar'
import { checkAuthenticated } from '@/utils'

export const Route = createFileRoute('/(master)/_layout')({
  // ! Authentication
  beforeLoad: () => {
    if (!checkAuthenticated()) throw redirect({ to: '/login' })
  },
  component: () => (
    <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
      <Header />
      <Sidebar />
      <Box
        component='main'
        className='MainContent'
        sx={{
          px: { xs: 2, md: 6 },
          pt: {
            xs: 'calc(12px + var(--Header-height))',
            sm: 'calc(12px + var(--Header-height))',
            md: 3
          },
          pb: { xs: 2, sm: 2, md: 3 },
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          height: '100dvh',
          gap: 1
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Breadcrumbs
            size='sm'
            aria-label='breadcrumbs'
            separator={<ChevronRightRoundedIcon fontSize='small' />}
            sx={{ pl: 0 }}
          >
            <Link underline='none' color='neutral' href='#some-link' aria-label='Home'>
              <HomeRoundedIcon />
            </Link>
            <Link underline='hover' color='neutral' href='#some-link' fontSize={12} fontWeight={500}>
              Dashboard
            </Link>
            <Typography color='primary' fontWeight={500} fontSize={12}>
              Orders
            </Typography>
          </Breadcrumbs>
        </Box>
        <Outlet />
      </Box>
    </Box>
  )
})
