import { useState } from 'react'

import { categoryApi, uploadApi } from '@/apis'
import { APP_MESSAGE } from '@/constants'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { Category } from '@/types/category'
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined'
import { Button, Typography } from '@mui/joy'
import AspectRatio from '@mui/joy/AspectRatio'
import Card from '@mui/joy/Card'
import IconButton from '@mui/joy/IconButton'

import FormCategory from './FormCategory'
import { CategoryForm } from './FormSchema'

interface Props {
  category: Category
  onAddToCategoryHome: (category: Category) => void
}

const CardCategory = ({ category, onAddToCategoryHome }: Props) => {
  const [open, setIsOpen] = useState(false)

  const queryClient = useQueryClient()

  const { mutate: uploadMutate, isPending: isUploadPending } = useMutation({
    mutationFn: (data: any) => uploadApi.create(data, 'multipart/form-data')
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => categoryApi.patch(category.id as string, data),
    onSuccess: (updatedCategoryResponse) => {
      const updatedCategory = updatedCategoryResponse?.data?.data

      if (updatedCategory) {
        toast.success(APP_MESSAGE.FORM.UPDATE_SUCCESS)
        queryClient.setQueryData(categoryApi.getKeyForList(), (oldData: any) => {
          if (!oldData || !oldData.data || !oldData.data.data) {
            return {
              data: {
                data: [updatedCategory]
              }
            }
          }

          return {
            ...oldData,
            data: {
              ...oldData.data,
              data: oldData.data.data.map((category: any) =>
                category.id === updatedCategory.id ? updatedCategory : category
              )
            }
          }
        })
      }

      setIsOpen(false)
    },
    onError: (error) => {
      toast.error(APP_MESSAGE.FORM.UPDATE_FAILED)
    }
  })

  const handleSubmit = async (_value: CategoryForm) => {
    // console.log('🚀 ~ handleSubmit update ~ _value:', _value)
    let dataUpdate = {
      ..._value,
      rank: category.rank
    }

    let image = ''
    // ? Case Upload new Image when Edit
    if (_value.image) {
      const uploadedFile: any = await new Promise((resolve, reject) => {
        uploadMutate(
          {
            file: _value.image
          },
          {
            onSuccess: (data) => resolve(data),
            onError: (error) => reject(error)
          }
        )
      })

      image = uploadedFile?.data.data

      dataUpdate = {
        ...dataUpdate,
        image: image as any // Pass new upload File Image
      }
    } else {
      dataUpdate = {
        ...dataUpdate,
        image: category.imageId as any // Pass old imageId
      }
    }
    // console.log('dataUpdate ::: ', dataUpdate)
    mutate(dataUpdate)
  }

  const isLoading = isPending || isUploadPending ? true : false

  return (
    <>
      <Card
        sx={{
          height: '100%',
          justifyContent: 'space-between'
        }}
      >
        <div>
          <AspectRatio minHeight='120px' maxHeight='200px'>
            {category.image && <img src={category.image} srcSet={category.image} loading='lazy' alt='' />}
          </AspectRatio>
          <div>
            <Typography level='title-lg' sx={{ py: '16px' }}>
              {category.name}
            </Typography>
            {/* <Typography level='body-sm'>April 24 to May 02, 2021</Typography> */}
            <IconButton
              aria-label='bookmark Bahamas Islands'
              variant='solid'
              // ! color={isBookMarked ? 'success' : 'neutral'}
              color='neutral'
              size='sm'
              sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
              onClick={() => onAddToCategoryHome(category)}
            >
              <BookmarkAdd />
            </IconButton>
          </div>
        </div>
        <div>
          <Button
            variant='solid'
            size='md'
            color='primary'
            aria-label='Explore Bahamas Islands'
            sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600, width: '100%' }}
            onClick={() => setIsOpen(true)}
          >
            Chỉnh sửa
          </Button>
        </div>
      </Card>

      <FormCategory
        id={category.id}
        category={category}
        defaultValues={{
          name: category.name,
          previewImage: category.image || undefined
        }}
        open={open}
        setOpen={setIsOpen}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </>
  )
}

export default CardCategory
