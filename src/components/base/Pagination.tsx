import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton'

import { useCheckBreakpointScreen } from '@/hooks'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { Fragment } from 'react/jsx-runtime'

import { APP_RULE } from '@/constants'
import ArrowDropDown from '@mui/icons-material/ArrowDropDown'
import Dropdown from '@mui/joy/Dropdown'
import Menu from '@mui/joy/Menu'
import MenuButton from '@mui/joy/MenuButton'
import MenuItem from '@mui/joy/MenuItem'

interface Props {
  handlePrevPage?: any
  handleNextPage?: any
  handleChangePage: (page: number) => void
  currentPage: number
  totalPages: number
  lambda?: number
  pageOptions?: {
    limit?: number
    onLimitChange?: (limit: number) => void
  }
}

const Pagination = ({
  handlePrevPage,
  handleNextPage,
  handleChangePage,
  currentPage,
  totalPages,
  lambda,
  pageOptions
}: Props) => {
  const pageItems = generatePageItems(currentPage, totalPages)
  const isPrev = currentPage > 1
  const isNext = currentPage < totalPages
  const limit = pageOptions?.limit || APP_RULE.PAGINATION.LIMIT_PAGINATION

  const isMobile = useCheckBreakpointScreen()

  // ? onClick '...'
  const handleEllipsisClick = (type: 'prev' | 'next') => {
    if (type === 'prev' && handlePrevPage) {
      handlePrevPage(lambda)
    } else if (type === 'next' && handleNextPage) {
      handleNextPage(lambda)
    }
  }

  return (
    <Box
      className='Pagination-laptopUp'
      sx={{
        pt: 2,
        gap: !isMobile ? 1 : 0.5,
        [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
        display: 'flex',
        justifyContent: 'end',
        marginTop: 'auto'
      }}
    >
      {isPrev && (
        <Button
          onClick={() => handlePrevPage()}
          size='sm'
          variant='outlined'
          color='neutral'
          sx={{ paddingX: !isMobile ? '12px' : '6px' }}
        >
          <KeyboardArrowLeftIcon
            sx={{
              marginRight: !isMobile ? '6px' : '0'
            }}
          />
          {!isMobile ? 'Trước' : ''}
        </Button>
      )}

      <Box />
      {pageItems.map((page, index) => (
        <Fragment key={index}>
          {page === '...' ? (
            <Box
              onClick={() => {
                if (index < pageItems.findIndex((p) => p === currentPage)) {
                  handleEllipsisClick('prev')
                } else {
                  handleEllipsisClick('next')
                }
              }}
              sx={{ px: 1, cursor: 'pointer' }}
            >
              ...
            </Box>
          ) : (
            <IconButton
              onClick={() => handleChangePage(page as number)}
              size='sm'
              variant={currentPage === page ? 'soft' : 'plain'}
              color='neutral'
            >
              {page}
            </IconButton>
          )}
        </Fragment>
      ))}
      <Box />

      {isNext && (
        <Button
          onClick={() => handleNextPage()}
          size='sm'
          variant='outlined'
          color='neutral'
          sx={{
            paddingX: !isMobile ? '12px' : '6px'
          }}
        >
          {!isMobile ? 'Sau' : ''}{' '}
          <KeyboardArrowRightIcon
            sx={{
              marginLeft: !isMobile ? '6px' : '0'
            }}
          />
        </Button>
      )}

      <Dropdown>
        <MenuButton endDecorator={<ArrowDropDown />}>{limit}/Page</MenuButton>
        <Menu sx={{ minWidth: 160, '--ListItemDecorator-size': '24px' }}>
          {APP_RULE.PAGINATION.LIMIT_RANGE.map((limit) => (
            <MenuItem key={limit} onClick={() => pageOptions?.onLimitChange && pageOptions.onLimitChange(limit)}>
              {limit}
            </MenuItem>
          ))}
        </Menu>
      </Dropdown>
    </Box>
  )
}

const generatePageItems = (currentPage: number, totalPages: number) => {
  const pageItems = []
  const visiblePages = 3

  if (totalPages <= visiblePages) {
    for (let i = 1; i <= totalPages; i++) {
      pageItems.push(i)
    }
  } else {
    const startPage = Math.max(1, currentPage - 1)
    const endPage = Math.min(totalPages, currentPage + 1)

    if (currentPage > 2) {
      pageItems.push(1)
      if (currentPage > visiblePages) pageItems.push('...')
    }

    for (let i = startPage; i <= endPage; i++) {
      pageItems.push(i)
    }

    if (currentPage < totalPages - 1) {
      if (currentPage < totalPages - 2) pageItems.push('...')
      pageItems.push(totalPages)
    }
  }

  return pageItems
}

export default Pagination
