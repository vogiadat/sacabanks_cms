import { APP_CONFIG } from '@/constants'

export function openSidebar() {
  if (typeof window !== 'undefined') {
    document.body.style.overflow = 'hidden'
    document.documentElement.style.setProperty('--SideNavigation-slideIn', '1')
  }
}

export function closeSidebar() {
  if (typeof window !== 'undefined') {
    document.documentElement.style.removeProperty('--SideNavigation-slideIn')
    document.body.style.removeProperty('overflow')
  }
}

export function toggleSidebar() {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const slideIn = window.getComputedStyle(document.documentElement).getPropertyValue('--SideNavigation-slideIn')
    if (slideIn) {
      closeSidebar()
    } else {
      openSidebar()
    }
  }
}

export const getRandomImageUrl = () => {
  const randomId = Math.floor(Math.random() * 1000)
  return `https://picsum.photos/seed/${randomId}/800/600`
}

export const getImageById = (id: string) => {
  if (!id) return ''

  return `${APP_CONFIG.BASE_URL.API}/upload/files/${id}`
}

export const sliceText = (text: string = '', maxLength: number = 30, replaceText: string = '...'): string => {
  if (!text) return ''
  const newText = text?.replace(/(&nbsp;)/gi, ' ').replace(/(<([^>]+)>)/gi, '')
  if (newText.length > maxLength) return `${newText.slice(0, maxLength)}${replaceText}`

  return newText
}

export function generateSlug(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
}
