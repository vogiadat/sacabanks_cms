import { ReactNode } from '@tanstack/react-router'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded'
import ColorLensIcon from '@mui/icons-material/ColorLens'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency'
import FaxIcon from '@mui/icons-material/Fax'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import { ADMIN_SUPER_ADMIN_ROLE, ALL_ROLE, RoleEnum } from '@/types'

type SidebarType = {
  title: string
  icon: ReactNode
  href: string
  allowRole: RoleEnum[]
  items?: Omit<SidebarType, 'icon' | 'allowRole'>[]
}

export const sidebarList: SidebarType[] = [
  {
    title: 'Home',
    href: '/',
    allowRole: ALL_ROLE,
    icon: <HomeRoundedIcon />
  },
  {
    title: 'Website UI',
    href: 'Website UI',
    icon: <ColorLensIcon />,
    allowRole: ADMIN_SUPER_ADMIN_ROLE,
    items: [
      { title: 'Ảnh Bìa', href: '/banner' },
      { title: 'Danh mục', href: '/category' }
    ]
  },
  {
    title: 'Sản Phẩm',
    href: '/product',
    allowRole: ALL_ROLE,
    icon: <LocalOfferIcon />
  },
  {
    title: 'Người Dùng',
    href: '/user',
    allowRole: ADMIN_SUPER_ADMIN_ROLE,
    icon: <ContactEmergencyIcon />
  },
  {
    title: 'Nhà Cung Cấp',
    href: '/supplier',
    allowRole: ADMIN_SUPER_ADMIN_ROLE,
    icon: <FaxIcon />
  },
  {
    title: 'Hoá Đơn',
    href: '/order',
    allowRole: ALL_ROLE,
    icon: <ShoppingCartRoundedIcon />
  },
  {
    title: 'Đơn Duyệt',
    href: '/active-user',
    allowRole: ADMIN_SUPER_ADMIN_ROLE,
    icon: <GroupAddIcon />
  }
]
