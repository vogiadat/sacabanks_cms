import { getRandomImageUrl } from '@/utils'
import { Delete } from '@mui/icons-material'
import { IconButton } from '@mui/joy'
import Avatar from '@mui/joy/Avatar'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import DialogContent from '@mui/joy/DialogContent'
import DialogTitle from '@mui/joy/DialogTitle'
import Divider from '@mui/joy/Divider'
import Drawer from '@mui/joy/Drawer'
import List from '@mui/joy/List'
import ListItem from '@mui/joy/ListItem'
import ListItemContent from '@mui/joy/ListItemContent'
import ListItemDecorator from '@mui/joy/ListItemDecorator'
import ModalClose from '@mui/joy/ModalClose'
import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import * as React from 'react'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function WhiteList({ open, setOpen }: Props) {
  return (
    <Drawer
      size='md'
      variant='plain'
      open={open}
      onClose={() => setOpen(false)}
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
      <Sheet
        sx={{
          borderRadius: 'md',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          height: '100%',
          overflow: 'auto'
        }}
      >
        <DialogTitle>Category Home</DialogTitle>
        <ModalClose />
        <Divider sx={{ mt: 'auto' }} />
        <DialogContent sx={{ gap: 2 }}>
          <Box>
            <Typography
              id='ellipsis-list-demo'
              level='body-xs'
              textTransform='uppercase'
              sx={{ letterSpacing: '0.15rem' }}
            >
              List
            </Typography>
            <List aria-labelledby='ellipsis-list-demo' sx={{ '--ListItemDecorator-size': '56px', width: '100%' }}>
              {[...Array(20).keys()].map((_, index) => (
                <ListItem key={index} sx={{ mb: 1, width: '100%' }}>
                  <ListItemDecorator>
                    <Avatar src={getRandomImageUrl()} />
                  </ListItemDecorator>
                  <ListItemContent>
                    <Typography level='title-sm'>Brunch this weekend?</Typography>
                    <Typography level='body-sm' noWrap>
                      I&apos;ll be in your neighborhood doing errands this Tuesday.
                    </Typography>
                  </ListItemContent>

                  <ListItemDecorator>
                    <IconButton sx={{ ml: 2 }} aria-label='Delete' size='sm' color='danger'>
                      <Delete />
                    </IconButton>
                  </ListItemDecorator>
                </ListItem>
              ))}
            </List>
          </Box>
        </DialogContent>

        <Divider sx={{ mt: 'auto' }} />
        <Stack direction='row' justifyContent='space-between' useFlexGap spacing={1}>
          <Button variant='outlined' color='neutral'>
            Clear
          </Button>
          <Button onClick={() => setOpen(false)}>Show All</Button>
        </Stack>
      </Sheet>
    </Drawer>
  )
}
