import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Input, { InputTypeMap } from '@mui/joy/Input'

import SearchIcon from '@mui/icons-material/Search'

type Props = {
  label?: string
  inputProps?: InputTypeMap['props']
}

const Search = ({ label, inputProps }: Props) => {
  return (
    <FormControl sx={{ flex: 1 }} size='sm'>
      <FormLabel>{label || 'Search'}</FormLabel>
      <Input size='sm' placeholder='Search' startDecorator={<SearchIcon />} {...inputProps} />
    </FormControl>
  )
}

export default Search
