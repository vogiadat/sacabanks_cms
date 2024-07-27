import { Category } from '@/types/category'
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined'
import { Button, Chip, Typography } from '@mui/joy'
import AspectRatio from '@mui/joy/AspectRatio'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import IconButton from '@mui/joy/IconButton'
import FormCategory from './FormCategory'
import { CategoryForm } from './FormSchema'
import { useState } from 'react'

interface Props {
  category: Category
  onAddToCategoryHome: (category: Category) => void
}

const CardCategory = ({ category, onAddToCategoryHome }: Props) => {
  const [open, setIsOpen] = useState(false)

  const handleSubmit = (_value: CategoryForm) => {
    console.log(_value)
  }

  return (
    <>
      <Card>
        <div>
          <Typography level='title-lg'>{category.name}</Typography>
          <Typography level='body-sm'>April 24 to May 02, 2021</Typography>
          <IconButton
            aria-label='bookmark Bahamas Islands'
            variant='plain'
            color='neutral'
            size='sm'
            sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
            onClick={() => onAddToCategoryHome(category)}
          >
            <BookmarkAdd />
          </IconButton>
        </div>
        <AspectRatio minHeight='120px' maxHeight='200px'>
          {category.image && <img src={category.image} srcSet={category.image} loading='lazy' alt='' />}
        </AspectRatio>
        <CardContent orientation='horizontal'>
          <div>
            <Typography level='body-xs'>Status</Typography>
            <Chip color='success'>Active</Chip>
          </div>
          <Button
            variant='solid'
            size='md'
            color='primary'
            aria-label='Explore Bahamas Islands'
            sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
            onClick={() => setIsOpen(true)}
          >
            Chỉnh sửa
          </Button>
        </CardContent>
      </Card>

      <FormCategory
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

export default CardCategory
