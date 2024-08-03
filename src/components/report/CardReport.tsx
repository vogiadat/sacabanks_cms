import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import Button from '@mui/joy/Button'
import Card from '@mui/joy/Card'
import CardActions from '@mui/joy/CardActions'
import CardContent from '@mui/joy/CardContent'
import CircularProgress from '@mui/joy/CircularProgress'
import SvgIcon from '@mui/joy/SvgIcon'
import Typography from '@mui/joy/Typography'
import { ReactNode, useNavigate } from '@tanstack/react-router'

interface Props {
  Icon: ReactNode
  link: string
  content: string | number
  subTittle: string
}

export const CardReport = (props: Props) => {
  const navigate = useNavigate()

  const handNavigate = () => navigate({ to: props.link })

  return (
    <Card
      variant='solid'
      color='primary'
      invertedColors
      sx={{ height: '100%' }}
    >
      <CardContent orientation='horizontal'>
        <CircularProgress
          size='lg'
          determinate
          value={Math.floor(Math.random() * 100) + 1}
        >
          <SvgIcon>{props.Icon}</SvgIcon>
        </CircularProgress>
        <CardContent>
          <Typography level='body-md'>{props.subTittle}</Typography>
          <Typography level='h2'>{props.content}</Typography>
        </CardContent>
      </CardContent>
      <CardActions>
        <Button
          variant='soft'
          size='sm'
          onClick={handNavigate}
          endDecorator={<KeyboardDoubleArrowRightIcon />}
        >
          Xem thêm
        </Button>
      </CardActions>
    </Card>
  )
}

export default CardReport
