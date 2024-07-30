import { CategoryType } from '@/types'
import { Button, Typography } from '@mui/joy'
import AspectRatio from '@mui/joy/AspectRatio'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import FormBanner from './FormBanner'
import { BannerForm } from './FormSchema'
import { useState } from 'react'

interface Props {
  category: CategoryType
  onAddToCategoryHome: (category: CategoryType) => void
}

const CardBanner = ({ category }: Props) => {
  const [open, setIsOpen] = useState(false)

  const handleSubmit = (_value: BannerForm) => {
    console.log(_value)
  }

  return (
    <>
      <Card>
        <div>
          <Typography level='title-lg'>{category.name}</Typography>
          <Typography level='body-sm'>April 24 to May 02, 2021</Typography>
        </div>
        <AspectRatio minHeight='120px' maxHeight='200px'>
          {category.image && <img src={category.image} srcSet={category.image} loading='lazy' alt='' />}
        </AspectRatio>
        <CardContent orientation='horizontal'>
          <Button
            variant='solid'
            size='md'
            color='primary'
            aria-label='Explore Bahamas Islands'
            sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600, flexGrow: 1 }}
            onClick={() => setIsOpen(true)}
          >
            Chỉnh sửa
          </Button>
        </CardContent>
      </Card>

      <FormBanner
        defaultValues={{
          name: category.name,
          previewImage: category.image || undefined
        }}
        open={open}
        setOpen={setIsOpen}
        onSubmit={handleSubmit}
      />
    </>
  )
}

export default CardBanner
