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

export const generatePassword = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#@$!'
  let password = ''

  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length)
    password += chars.charAt(randomIndex)
  }

  return password
}

export const getUsernameFromEmail = (email: string) => {
  const [name] = email.split('@')
  const uuid = generateShortUUID()
  return `${name}-${uuid}`
}

export const generateShortUUID = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let shortUUID = ''
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length)
    shortUUID += chars.charAt(randomIndex)
  }
  return shortUUID
}

export const formatUnikey = (str: string) => {
  const newStr = str.toLowerCase()
  const specialChar = 'àáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ'
  const nonSpecialChar = 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyd'

  let output = ''
  for (let i = 0; i < newStr.length; i++) {
    const index = specialChar.indexOf(newStr[i])
    if (index != -1) {
      output += nonSpecialChar[index]
    } else {
      output += newStr[i]
    }
  }
  return output
}
