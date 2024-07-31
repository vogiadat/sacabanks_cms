import { Typography } from '@mui/joy'

interface Props {
  message: string | undefined
}

export const InputError = ({ message }: Props) =>
  message ? (
    <Typography fontSize={14} marginTop={0.5} textColor='red'>
      {message}
    </Typography>
  ) : (
    <></>
  )
