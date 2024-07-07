import { ReactNode } from '@tanstack/react-router'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded'

type SidebarType = {
  title: string
  icon: ReactNode
  href: string
}

export const sidebarList: SidebarType[] = [
  {
    title: 'Home',
    href: '/',
    icon: <HomeRoundedIcon />
  },

  {
    title: 'Orders',
    href: '/order',
    icon: <ShoppingCartRoundedIcon />
  }
]
