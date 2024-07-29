import { useEffect } from 'react'

import { useNavigate } from '@tanstack/react-router'

import { checkAuthenticated } from '@/utils'

export const useCheckAuth = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (checkAuthenticated()) navigate({ to: '/' })
  }, [])
}
