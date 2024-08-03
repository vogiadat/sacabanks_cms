import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Outlet, redirect, useLocation, useNavigate } from '@tanstack/react-router'

import { userApi } from '@/apis/user.api'
import { IUserItem } from '@/interfaces'
import { useUserStore } from '@/stores'
import { ADMIN_SUPER_ADMIN_ROLE, ALLOW_ROUTER_NOT_ADMIN, RoleEnum } from '@/types'
import { checkAuthenticated } from '@/utils'

import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/sidebar'
import { LoadingFullPage } from '@/components/loading'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import Box from '@mui/joy/Box'
import Breadcrumbs from '@mui/joy/Breadcrumbs'
import Link from '@mui/joy/Link'
import Typography from '@mui/joy/Typography'
import { sidebarList } from '@/components/layout/sidebar/data'

export const Route = createFileRoute('/(master)/_layout')({
  // ! Authentication
  beforeLoad: () => {
    if (!checkAuthenticated()) throw redirect({ to: '/login' })
  },
  component: Page
})

function Page() {
  const location = useLocation()
  const pathname = location.pathname
  const navigate = useNavigate()

  const { data, isLoading } = useQuery({
    queryKey: userApi.getKey('other', undefined, 'me'),
    queryFn: () => userApi.getMe()
  })

  const getCurrentPath = () => {
    return sidebarList
      .flatMap((item) => {
        if (pathname.includes(item.href)) {
          return item
        }
      })
      .filter((item) => item !== undefined)
  }

  const { userProfile, setUserProfile } = useUserStore()

  useEffect(() => {
    if (!userProfile && data?.data.data) {
      const resUserProfile = data?.data.data as IUserItem
      setUserProfile(resUserProfile)

      // ! Authorization
      // ? Nếu không phải ADMIN || SUPER_ADMIN và router không nằm trong ALLOW_ROUTER_NOT_ADMIN thì cook
      if (
        resUserProfile &&
        !ADMIN_SUPER_ADMIN_ROLE.includes(resUserProfile.role.name as RoleEnum) &&
        !ALLOW_ROUTER_NOT_ADMIN.includes(pathname)
      ) {
        navigate({ to: '/not-found' })
      }
    }
  }, [data?.data.data, userProfile, pathname])

  return (
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
            {getCurrentPath().map((item) =>
              item!.href === '/' ? (
                <Link underline='none' color='neutral' href='/' aria-label='Home' key={item!.title}>
                  <HomeRoundedIcon />
                </Link>
              ) : (
                <Typography color='primary' fontWeight={500} fontSize={12} key={item!.title}>
                  {item!.title}
                </Typography>
              )
            )}
          </Breadcrumbs>
        </Box>
        {isLoading ? (
          <div>
            <LoadingFullPage />
          </div>
        ) : (
          <Outlet />
        )}
      </Box>
    </Box>
  )
}
