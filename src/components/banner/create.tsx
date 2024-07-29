import { Add } from '@mui/icons-material'
import { Button } from '@mui/joy'
import React from 'react'

import FormBanner from './FormBanner'
import { BannerForm, defaultValues } from './FormSchema'

const Create = () => {
  const [open, setOpen] = React.useState(false)

  const handleSubmit = (_value: BannerForm) => {
    // TODO: submit form
    console.log({ _value })
  }

  return (
    <>
      <Button color='primary' startDecorator={<Add />} size='sm' onClick={() => setOpen(true)}>
        Tạo mới
      </Button>
      <FormBanner open={open} setOpen={setOpen} defaultValues={defaultValues} onSubmit={handleSubmit} />
    </>
  )
}

export default Create
