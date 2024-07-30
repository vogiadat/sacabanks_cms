import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Input, { InputTypeMap } from '@mui/joy/Input'

import SearchIcon from '@mui/icons-material/Search'
import { Box, Sheet } from '@mui/joy'

type Props = {
  label?: string
  inputProps?: InputTypeMap['props']
}

const Search = ({ label, inputProps }: Props) => {
  return (
    <>
      <Sheet
        className='Search-mobile'
        sx={{
          display: { xs: 'flex', sm: 'none' },
          flex: 1
        }}
      >
        <Input size='sm' placeholder='Tìm kiếm' startDecorator={<SearchIcon />} sx={{ flex: 1 }} {...inputProps} />
      </Sheet>
      <Box
        className='Search-tabletUp'
        sx={{
          display: { xs: 'none', sm: 'flex' },
          flex: 1,
          '& > *': {
            minWidth: { xs: '120px', md: '160px' }
          }
        }}
      >
        <FormControl sx={{ flex: 1 }} size='sm'>
          <FormLabel>{label || 'Tìm kiếm'}</FormLabel>
          <Input size='sm' placeholder='Tìm kiếm' startDecorator={<SearchIcon />} {...inputProps} />
        </FormControl>
      </Box>
    </>
  )
}

// const Search = ({ label, inputProps }: Props) => {
//   return (
//     <FormControl sx={{ flex: 1 }} size='sm'>
//       <FormLabel>{label || 'Tìm kiếm'}</FormLabel>
//       <Input size='sm' placeholder='Tìm kiếm' startDecorator={<SearchIcon />} {...inputProps} />
//     </FormControl>
//   )
// }

export default Search
