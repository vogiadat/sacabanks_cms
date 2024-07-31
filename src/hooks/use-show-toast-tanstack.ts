import { useEffect } from 'react'

import { APP_MESSAGE, IS_PRODUCTION } from '@/constants'
import { toast } from 'sonner'

export const useShowToastTanStack = (messageSuccess: string, isSuccess: boolean, error: any) => {
  useEffect(() => {
    if (isSuccess) {
      toast.success(messageSuccess)
    }

    if (error) {
      !IS_PRODUCTION && console.log('useShowToastTanStack error :::', error)
      !IS_PRODUCTION && console.log('useShowToastTanStack error status :::', error?.status)

      toast.error(error?.response?.data?.message ?? APP_MESSAGE.GENERAL.FAILED)
    }
  }, [isSuccess, messageSuccess, error])
}
