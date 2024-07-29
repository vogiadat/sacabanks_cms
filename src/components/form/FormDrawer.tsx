import { Button } from '@mui/joy'
import DialogContent from '@mui/joy/DialogContent'
import DialogTitle from '@mui/joy/DialogTitle'
import Divider from '@mui/joy/Divider'
import Drawer from '@mui/joy/Drawer'
import ModalClose from '@mui/joy/ModalClose'
import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'
import { ReactNode } from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form'

type Props<T extends FieldValues> = {
  open: boolean
  children: ReactNode
  form: UseFormReturn<T, unknown, undefined>
  onSubmit: (value: T) => void
  onClose: () => void
}

const FormDrawer = <T extends FieldValues>({ open, onClose, children, form, onSubmit }: Props<T>) => {
  const { handleSubmit } = form
  return (
    <Drawer
      size='md'
      anchor={'right'}
      variant='plain'
      open={open}
      onClose={onClose}
      slotProps={{
        content: {
          sx: {
            bgcolor: 'transparent',
            p: { md: 3, sm: 0 },
            boxShadow: 'none'
          }
        }
      }}
    >
      <form onSubmit={handleSubmit(onSubmit, console.log)}>
        <Sheet
          sx={{
            borderRadius: 'md',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            overflow: 'auto'
          }}
        >
          <DialogTitle>New Category</DialogTitle>
          <ModalClose />
          <Divider sx={{ mt: 'auto' }} />
          <DialogContent sx={{ gap: 2 }}>{children}</DialogContent>
          <Stack direction='row' justifyContent='end' useFlexGap spacing={1}>
            <Button type='submit' sx={{ flexGrow: '1' }}>
              Save
            </Button>
          </Stack>
        </Sheet>
      </form>
    </Drawer>
  )
}

export default FormDrawer
