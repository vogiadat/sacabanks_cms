import { ReactNode } from '@tanstack/react-router'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded'
import ColorLensIcon from '@mui/icons-material/ColorLens'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency'
import FaxIcon from '@mui/icons-material/Fax'
import GroupAddIcon from '@mui/icons-material/GroupAdd'

type SidebarType = {
  title: string
  icon: ReactNode
  href: string
  items?: Omit<SidebarType, 'icon'>[]
}

export const sidebarList: SidebarType[] = [
  {
    title: 'Home',
    href: '/',
    icon: <HomeRoundedIcon />
  },
  {
    title: 'Website UI',
    href: 'Website UI',
    icon: <ColorLensIcon />,
    items: [
      { title: 'Ảnh Bìa', href: '/banner' },
      { title: 'Danh mục', href: '/category' }
    ]
  },
  {
    title: 'Sản Phẩm',
    href: '/product',
    icon: <LocalOfferIcon />
  },
  {
    title: 'Người Dùng',
    href: '/user',
    icon: <ContactEmergencyIcon />
  },
  {
    title: 'Nhà Cung Cấp',
    href: '/supplier',
    icon: <FaxIcon />
  },
  {
    title: 'Đơn Hàng',
    href: '/order',
    icon: <ShoppingCartRoundedIcon />
  },
  {
    title: 'Đơn Duyệt',
    href: '/active-user',
    icon: <GroupAddIcon />
  }
]
