import { ReactNode } from '@tanstack/react-router'
import { ADMIN_SUPER_ADMIN_ROLE, ALL_ROLE, RoleEnum } from '@/types'
import {
  TextSnippet,
  HomeRounded,
  ColorLens,
  LocalOffer,
  ContactEmergency,
  Fax,
  GroupAdd
} from '@mui/icons-material'

type SidebarType = {
  title: string
  icon: ReactNode
  href: string
  allowRole: RoleEnum[]
  items?: Omit<SidebarType, 'icon' | 'allowRole'>[]
}

export const sidebarList: SidebarType[] = [
  {
    title: 'Trang Chủ',
    href: '/',
    allowRole: ALL_ROLE,
    icon: <HomeRounded />
  },
  {
    title: 'Website UI',
    href: 'Website UI',
    icon: <ColorLens />,
    allowRole: ADMIN_SUPER_ADMIN_ROLE,
    items: [
      // { title: 'Ảnh Bìa', href: '/banner' },
      { title: 'Danh mục', href: '/category' }
    ]
  },
  {
    title: 'Sản Phẩm',
    href: '/product',
    allowRole: ALL_ROLE,
    icon: <LocalOffer />
  },
  {
    title: 'Người Dùng',
    href: '/user',
    allowRole: ADMIN_SUPER_ADMIN_ROLE,
    icon: <ContactEmergency />
  },
  {
    title: 'Nhà Cung Cấp',
    href: '/supplier',
    allowRole: ADMIN_SUPER_ADMIN_ROLE,
    icon: <Fax />
  },
  {
    title: 'Hoá Đơn',
    href: '/order',
    allowRole: ALL_ROLE,
    icon: <TextSnippet />
  },
  {
    title: 'Đơn Duyệt',
    href: '/active-user',
    allowRole: ADMIN_SUPER_ADMIN_ROLE,
    icon: <GroupAdd />
  }
]
