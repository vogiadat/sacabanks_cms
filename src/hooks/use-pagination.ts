import { Dispatch, useEffect, useState } from 'react'

import { PaginationType } from '@/types'

// ? Using this when call this hook
export const initPagination = {
  currentPage: 1,
  totalPages: -1,
  totalItems: -1,
  totalLoadItems: -1
}

export const usePagination = () => {
  const [pagination, setPagination] = useState<PaginationType>(initPagination)

  const handleNextPage = (lambda: number | undefined = 1) => {
    setPagination((prev) => {
      let currentPage = prev.currentPage + lambda
      if (lambda === 1 && currentPage <= pagination.totalPages) {
        return {
          ...prev,
          currentPage
        }
      } else if (lambda > 1) {
        currentPage = currentPage > pagination.totalPages ? pagination.totalPages : prev.currentPage + lambda

        return {
          ...prev,
          currentPage
        }
      } else {
        console.log('cannot click NextPage')
      }

      return prev
    })
  }

  const handlePrevPage = (lambda: number | undefined = 1) => {
    setPagination((prev) => {
      let currentPage = prev.currentPage - lambda
      if (lambda === 1 && currentPage >= 1) {
        return {
          ...prev,
          currentPage
        }
      } else if (lambda > 1) {
        if (currentPage < 1) currentPage = 1

        return {
          ...prev,
          currentPage
        }
      } else {
        console.log('cannot click PrevPage')
      }
      return prev
    })
  }

  const handleChangePage = (page: number) => {
    if (page !== pagination.currentPage) {
      setPagination((prev) => ({
        ...prev,
        currentPage: page
      }))
    } else {
      console.log('cannot change same current page')
    }
  }

  return {
    pagination,
    setPagination,
    handleNextPage,
    handlePrevPage,
    handleChangePage
  }
}

export const useSetTotalPages = (
  isSuccess: boolean,
  pagination: PaginationType,
  setPagination: Dispatch<React.SetStateAction<PaginationType>>,
  totalPages: number
) => {
  useEffect(() => {
    if (isSuccess && pagination.totalPages === -1) {
      setPagination({
        ...pagination,
        totalPages
      })
    }
  }, [isSuccess])
}
