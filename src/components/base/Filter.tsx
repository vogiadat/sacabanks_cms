import { FilterType } from '@/types'
import { FilterAlt } from '@mui/icons-material'
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  IconButton,
  Modal,
  ModalClose,
  ModalDialog,
  Option,
  Select,
  Sheet,
  Typography
} from '@mui/joy'
import { useState } from 'react'

type Props = {
  filterList: FilterType[]
}

const Filter = ({ filterList = [] }: Props) => {
  const [open, setOpen] = useState(false)

  const renderFilters = () =>
    filterList.map(({ name, items, selectProps, onChange }) => (
      <FormControl size='sm' key={name}>
        <FormLabel>{name}</FormLabel>
        <Select
          size='sm'
          placeholder='Bộ Lọc'
          slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
          {...selectProps}
          onChange={(_, value) => {
            value && onChange(value)
          }}
        >
          {items.map((item) => (
            <Option value={item.value} key={item.value}>
              {item.label}
            </Option>
          ))}
        </Select>
      </FormControl>
    ))
  return (
    <>
      <Sheet
        className='Filters-mobile'
        sx={{
          display: { xs: 'flex', sm: 'none' }
        }}
      >
        <IconButton size='sm' variant='outlined' color='neutral' onClick={() => setOpen(true)}>
          <FilterAlt />
        </IconButton>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog aria-labelledby='filter-modal' layout='fullscreen'>
            <ModalClose />
            <Typography id='filter-modal' level='h2' textColor={'primary.500'}>
              Bộ Lọc
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Sheet sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {renderFilters()}
              <Button color='primary' onClick={() => setOpen(false)}>
                Lọc
              </Button>
            </Sheet>
          </ModalDialog>
        </Modal>
      </Sheet>
      <Box
        className='Filters-tabletUp'
        sx={{
          display: { xs: 'none', sm: 'flex' },
          flexWrap: 'wrap',
          gap: 1.5,
          '& > *': {
            minWidth: { xs: '120px', md: '160px' }
          }
        }}
      >
        {renderFilters()}
      </Box>
    </>
  )
}

// const Filter = ({ name, items, selectProps, onChange }: IFilterItem) => {
//   return (
//     <FormControl size='sm'>
//       <FormLabel>{name}</FormLabel>
//       <Select
//         size='sm'
//         placeholder='Filter'
//         slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
//         {...selectProps}
//         onChange={(_, value) => {
//           value && onChange(value)
//         }}
//       >
//         {items.map((item) => (
//           <Option value={item.value} key={item.value}>
//             {item.label}
//           </Option>
//         ))}
//       </Select>
//     </FormControl>
//   )
// }

export default Filter
