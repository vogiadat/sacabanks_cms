import { InfoOutlined } from '@mui/icons-material'
import {
  Button,
  Chip,
  ChipDelete,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack
} from '@mui/joy'
import { useState } from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import { BlogForm } from './FormSchema'

interface Props {
  form: UseFormReturn<BlogForm>
}

const FormTags = ({ form }: Props) => {
  const { control } = form

  const [text, setText] = useState('')

  return (
    <Controller
      control={control}
      name={'focusKeywords'}
      render={({ field: { onChange, value }, fieldState }) => {
        const error = fieldState.error?.message

        const handleAdd = () => {
          if (text) {
            onChange([...value, text])
            setText('')
          }
        }

        const handleRemoveIndex = (i: number) => {
          onChange(value.filter((_, index) => index !== i))
        }

        return (
          <FormControl error={!!error}>
            <FormLabel>Focus keywords</FormLabel>

            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              startDecorator={
                <Stack
                  direction={'row'}
                  justifyContent={'space-between'}
                  spacing={1}
                >
                  {value.map((keyword, index) => (
                    <Chip
                      key={index}
                      variant='soft'
                      color='success'
                      endDecorator={
                        <ChipDelete onDelete={() => handleRemoveIndex(index)} />
                      }
                    >
                      {keyword}
                    </Chip>
                  ))}
                </Stack>
              }
              endDecorator={<Button onClick={handleAdd}>Add</Button>}
            />

            {error && (
              <FormHelperText>
                <InfoOutlined />
                {error}
              </FormHelperText>
            )}
          </FormControl>
        )
      }}
    />
  )
}

export default FormTags
