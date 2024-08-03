import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import Typography from '@mui/joy/Typography'

interface Props {
  name?: string
  isOpen: boolean
  isLoading: boolean
  onClose?: () => void
  onConfirm?: () => void
}

export const ModalConfirmDelete = ({
  name,
  isOpen,
  isLoading = false,
  onClose,
  onConfirm
}: Props) => {
  return (
    <>
      <Modal open={isOpen} onClose={onClose}>
        <ModalDialog
          aria-labelledby='nested-modal-title'
          aria-describedby='nested-modal-description'
          sx={(theme) => ({
            [theme.breakpoints.only('xs')]: {
              top: 'unset',
              bottom: 0,
              left: 0,
              right: 0,
              borderRadius: 0,
              transform: 'none',
              maxWidth: 'unset'
            }
          })}
        >
          <Typography id='nested-modal-title' level='h2'>
            Bạn có chắc chắn muốn xoá ?
          </Typography>
          <Typography id='nested-modal-description' textColor='text.tertiary'>
            Bạn sẽ xoá{' '}
            {name ? (
              <Typography
                textColor='danger.500'
                fontWeight={700}
              >{`"${name}"`}</Typography>
            ) : null}{' '}
            và không thể khôi phục !
          </Typography>
          <Box
            sx={{
              mt: 1,
              display: 'flex',
              gap: 1,
              flexDirection: { xs: 'column', sm: 'row-reverse' }
            }}
          >
            <Button
              variant='solid'
              color='primary'
              onClick={onConfirm}
              disabled={isLoading}
            >
              Xác nhận
            </Button>
            <Button variant='outlined' color='neutral' onClick={onClose}>
              Không
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </>
  )
}
