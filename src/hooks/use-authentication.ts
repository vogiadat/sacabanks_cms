import { useEffect } from 'react'

import { useNavigate } from '@tanstack/react-router'

import { checkAuthenticated, removeAuthStore } from '@/utils'
import { useUserStore } from '@/stores'
import { useQueryClient } from '@tanstack/react-query'
import { userApi } from '@/apis/user.api'

export const useAuthentication = () => {
  const { setUserProfile } = useUserStore()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const handleLogout = () => {
    removeAuthStore()
    setUserProfile(null)
    queryClient.setQueryData(userApi.getKey('other', undefined, 'me'), null)
    navigate({ to: '/login' })
  }

  return {
    handleLogout
  }
}

export const useCheckAuth = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (checkAuthenticated()) navigate({ to: '/' })
  }, [])
}
