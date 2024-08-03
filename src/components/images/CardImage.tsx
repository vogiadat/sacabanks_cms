import { IListPhotoItem } from '@/interfaces'
import { getImageById, showToastError, showToastQuerySuccess } from '@/utils'
import DeleteIcon from '@mui/icons-material/Delete'
import { Box } from '@mui/joy'
import AspectRatio from '@mui/joy/AspectRatio'
import IconButton from '@mui/joy/IconButton'
import { ModalConfirmDelete } from '../modal'
import { listPhotoApi } from '@/apis/list-photo.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { productApi } from '@/apis'

interface Props {
  item: IListPhotoItem
}

export const CardImage = ({ item }: Props) => {
  const queryClient = useQueryClient()
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)

  const { mutateAsync: mutateDelete, isPending: isPendingDelete } = useMutation({
    mutationFn: (id: string) => listPhotoApi.delete(id)
  })

  const handleDelete = () => {
    mutateDelete(item.id)
      .then((res) => {
        queryClient.invalidateQueries({
          queryKey: productApi.getKey('findById', { id: item.productId }),
          exact: true
        })

        // ? Reset data
        setDeleteModalOpen(false)
        showToastQuerySuccess('DELETE_SUCCESS')(res)
      })
      .catch(showToastError)
  }

  return (
    <Box
      component={'div'}
      sx={{
        height: '100%',
        justifyContent: 'space-between',
        position: 'relative'
      }}
    >
      <div>
        <IconButton
          aria-label='bookmark Bahamas Islands'
          variant='soft'
          color='danger'
          size='sm'
          sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem', zIndex: 1 }}
          onClick={() => setDeleteModalOpen(true)}
        >
          <DeleteIcon />
        </IconButton>
      </div>
      <AspectRatio minHeight='120px' maxHeight='200px' sx={{ borderRadius: 'md' }}>
        <img src={getImageById(item.photoUrl)} srcSet={getImageById(item.photoUrl)} loading='lazy' alt='' />
      </AspectRatio>

      {/* // ? Modal */}
      <ModalConfirmDelete
        name={'ảnh này'}
        isOpen={isDeleteModalOpen}
        isLoading={isPendingDelete}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
    </Box>
  )
}
