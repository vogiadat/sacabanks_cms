import { useEffect, useState } from 'react'

type BreakPointType = 600 | 1024

export const useCheckBreakpointScreen = (breakpoint: BreakPointType = 600) => {
  const [isBreakpointScreen, setIsBreakpointScreen] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsBreakpointScreen(window.innerWidth <= breakpoint)
    }

    checkScreenSize()

    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [breakpoint])

  return isBreakpointScreen
}
