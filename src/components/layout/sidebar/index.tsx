import BrightnessAutoRoundedIcon from '@mui/icons-material/BrightnessAutoRounded'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import SupportRoundedIcon from '@mui/icons-material/SupportRounded'
import Avatar from '@mui/joy/Avatar'
import Box from '@mui/joy/Box'
import Divider from '@mui/joy/Divider'
import GlobalStyles from '@mui/joy/GlobalStyles'
import IconButton from '@mui/joy/IconButton'
import Input from '@mui/joy/Input'
import List from '@mui/joy/List'
import ListItem from '@mui/joy/ListItem'
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton'
import ListItemContent from '@mui/joy/ListItemContent'
import Sheet from '@mui/joy/Sheet'
import Typography from '@mui/joy/Typography'
import * as React from 'react'

import { Link, useNavigate } from '@tanstack/react-router'
import { closeSidebar, removeAuthStore } from '@/utils'
import ColorSchemeToggle from '../ColorSchemeToggle'
import { sidebarList } from './data'
import SidebarItem from './SidebarItem'
import { useUserStore } from '@/stores'
import { RoleEnum } from '@/types'

function Toggler({
  defaultExpanded = false,
  renderToggle,
  children
}: {
  defaultExpanded?: boolean
  children: React.ReactNode
  renderToggle: (params: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => React.ReactNode
}) {
  const [open, setOpen] = React.useState(defaultExpanded)
  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: '0.2s ease',
          '& > *': {
            overflow: 'hidden'
          }
        }}
      >
        {children}
      </Box>
    </React.Fragment>
  )
}

export default function Sidebar() {
  const navigate = useNavigate()

  const { userProfile } = useUserStore()
  console.log('🚀 ~ SidebarItem ~ userProfile:', userProfile?.role.name)

  const handleLogout = () => {
    removeAuthStore()
    navigate({ to: '/login' })
  }

  return (
    <Sheet
      className='Sidebar'
      sx={{
        position: { xs: 'fixed', md: 'sticky' },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none'
        },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 10,
        height: '100dvh',
        width: 'var(--Sidebar-width)',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider'
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Sidebar-width': '220px',
            [theme.breakpoints.up('lg')]: {
              '--Sidebar-width': '240px'
            }
          }
        })}
      />
      <Box
        className='Sidebar-overlay'
        sx={{
          position: 'fixed',
          zIndex: 9998,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          opacity: 'var(--SideNavigation-slideIn)',
          backgroundColor: 'var(--joy-palette-background-backdrop)',
          transition: 'opacity 0.4s',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
            lg: 'translateX(-100%)'
          }
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <IconButton variant='soft' color='primary' size='sm'>
          <BrightnessAutoRoundedIcon />
        </IconButton>
        <Typography level='title-lg'>Sacabanks</Typography>
        <ColorSchemeToggle sx={{ ml: 'auto' }} />
      </Box>
      <Input size='sm' startDecorator={<SearchRoundedIcon />} placeholder='Search' />
      <Box
        sx={{
          minHeight: 0,
          overflow: 'hidden auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5
          }
        }}
      >
        <List
          size='sm'
          sx={{
            gap: 1,
            '--List-nestedInsetStart': '30px',
            '--ListItem-radius': (theme) => theme.vars.radius.sm
          }}
        >
          {sidebarList.map((item, index) => {
            // ! Authorization
            const isAllowRole = userProfile && item.allowRole.includes(userProfile?.role.name as RoleEnum)

            if (item.items) {
              if (isAllowRole) {
                return (
                  <ListItem nested key={index}>
                    <Toggler
                      renderToggle={({ open, setOpen }) => (
                        <ListItemButton onClick={() => setOpen(!open)}>
                          {item.icon}
                          <ListItemContent>
                            <Typography level='title-sm'>{item.title}</Typography>
                          </ListItemContent>
                          <KeyboardArrowDownIcon sx={{ transform: open ? 'rotate(180deg)' : 'none' }} />
                        </ListItemButton>
                      )}
                    >
                      <List sx={{ gap: 0.5 }}>
                        {item.items.map((child, index) => (
                          <ListItem sx={{ mt: index === 0 ? 0.5 : undefined }} key={index}>
                            <ListItemButton role='menuitem' component={Link} to={child.href}>
                              {child.title}
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    </Toggler>
                  </ListItem>
                )
              }
              return <></>
            }

            if (isAllowRole) {
              return <SidebarItem {...item} key={index} />
            }

            return <></>
          })}
        </List>

        <List
          size='sm'
          sx={{
            mt: 'auto',
            flexGrow: 0,
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
            '--List-gap': '8px',
            mb: 2
          }}
        >
          <ListItem>
            <ListItemButton>
              <SupportRoundedIcon />
              Support
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <SettingsRoundedIcon />
              Settings
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Avatar
          variant='outlined'
          size='sm'
          src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286'
        />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level='title-sm'>Siriwat K.</Typography>
          <Typography level='body-xs'>siriwatk@test.com</Typography>
        </Box>
        <IconButton size='sm' variant='plain' color='neutral' onClick={handleLogout}>
          <LogoutRoundedIcon />
        </IconButton>
      </Box>
    </Sheet>
  )
}
