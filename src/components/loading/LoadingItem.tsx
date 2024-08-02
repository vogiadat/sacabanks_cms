import { Button, ButtonTypeMap } from '@mui/joy'

type Props = ButtonTypeMap['props']

export const LoadingItem = (props: Props) => <Button loading variant='plain' size='lg' {...props} />
