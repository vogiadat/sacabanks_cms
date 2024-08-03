import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Input, { InputTypeMap } from '@mui/joy/Input'

import SearchIcon from '@mui/icons-material/Search'
import { useDebounceValue } from '@/hooks'
import { useEffect, useState } from 'react'
import { LoadingItem } from '@/components/loading'

type Props = {
  label?: string
  inputProps?: InputTypeMap['props']
  onDebounceChange?: (value: string) => void
}

const Search = ({ label, inputProps, onDebounceChange }: Props) => {
  const [search, setSearch] = useState<string>(inputProps?.value as string)
  const { debounceValue: searchDebounce, isLoading: isLoadingDebounce } = useDebounceValue(search)

  useEffect(() => {
    onDebounceChange && onDebounceChange(searchDebounce)
  }, [searchDebounce])
  return (
    <FormControl sx={{ flex: 1 }} size='sm'>
      <FormLabel>{label ?? 'Tìm kiếm'}</FormLabel>
      <Input
        size='sm'
        placeholder={label ?? 'Tìm kiếm'}
        startDecorator={isLoadingDebounce ? <LoadingItem size='sm' /> : <SearchIcon />}
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        {...inputProps}
      />
    </FormControl>
  )
}

export default Search
