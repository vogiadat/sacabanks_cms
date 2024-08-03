import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { authApi } from '@/apis'
import { APP_CONFIG, APP_MESSAGE } from '@/constants'
import { useCheckAuth, useFakeRender, useShowToastTanStack } from '@/hooks'
import { LoginType } from '@/types'
import { loginSchema, saveAuthStore } from '@/utils'

import { InputError } from '@/components'
import ColorSchemeToggle from '@/components/layout/ColorSchemeToggle'
import { LoadingFullPage } from '@/components/loading'
import { Avatar, SvgIcon } from '@mui/joy'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import Divider from '@mui/joy/Divider'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import GlobalStyles from '@mui/joy/GlobalStyles'
import Input from '@mui/joy/Input'
import Link from '@mui/joy/Link'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useState } from 'react'

export const Route = createLazyFileRoute('/(auth)/login')({
  component: Page
})

function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema)
  })

  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const isRendering = useFakeRender()

  const { mutate, isSuccess, isPending, error } = useMutation({
    mutationFn: (data: LoginType) => authApi.postLogin(data),
    onSuccess(res) {
      const loginResponseType = {
        accessToken: res?.data.data as string
      }

      saveAuthStore(loginResponseType)
      navigate({ to: '/' })
    }
  })

  const handleSubmitForm = async (values: z.infer<typeof loginSchema>) => {
    console.log('🚀 ~ handleSubmitForm ~ values:', values)
    mutate({
      username: values.email,
      password: values.password
    })
  }

  useCheckAuth()

  useShowToastTanStack(APP_MESSAGE.AUTH.LOGIN_SUCCESS, isSuccess, error)

  return isRendering ? (
    <LoadingFullPage />
  ) : (
    <>
      <GlobalStyles
        styles={{
          ':root': {
            '--Form-maxWidth': '800px',
            '--Transition-duration': '0.4s' // set to `none` to disable transition
          }
        }}
      />

      <Box
        sx={(theme) => ({
          width: { xs: '100%', md: '50vw' },
          transition: 'width var(--Transition-duration)',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255 255 255 / 0.2)',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundColor: 'rgba(19 19 24 / 0.4)'
          }
        })}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100dvh',
            width: '100%',
            px: 2
          }}
        >
          <Box
            component='header'
            sx={{
              py: 3,
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
              <Avatar
                src='/icons/icon.png'
                sx={{ objectFit: 'cover', bgcolor: 'transparent' }}
              />
              <Typography level='title-lg'>Sacabanks</Typography>
            </Box>
            <ColorSchemeToggle />
          </Box>
          <Box
            component='main'
            sx={{
              my: 'auto',
              py: 2,
              pb: 5,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: 400,
              maxWidth: '100%',
              mx: 'auto',
              borderRadius: 'sm',
              '& form': {
                display: 'flex',
                flexDirection: 'column',
                gap: 2
              },
              [`& .MuiFormLabel-asterisk`]: {
                visibility: 'hidden'
              }
            }}
          >
            <Stack gap={4} sx={{ mb: 2 }}>
              <Stack gap={1}>
                <Typography component='h1' level='h3'>
                  Đăng Nhập
                </Typography>
                <Typography level='body-sm'>
                  Bạn muốn tham gia cùng chúng tôi?{' '}
                  <Link
                    href={APP_CONFIG.BASE_URL.CLIENT + '/register'}
                    level='title-sm'
                  >
                    Đăng Ký
                  </Link>
                </Typography>
              </Stack>
              <Button
                variant='soft'
                color='neutral'
                fullWidth
                disabled
                startDecorator={<GoogleIcon />}
                onClick={() => console.log('clicked login google')}
              >
                Continue with Google - Coming Soon
              </Button>
            </Stack>
            <Divider
              sx={(theme) => ({
                [theme.getColorSchemeSelector('light')]: {
                  color: { xs: '#FFF', md: 'text.tertiary' }
                }
              })}
            >
              or
            </Divider>
            <Stack gap={4} sx={{ mt: 2 }}>
              <form onSubmit={handleSubmit(handleSubmitForm)}>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input type='email' {...register('email')} />
                  {errors.email && (
                    <InputError message={errors.email.message} />
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                    endDecorator={
                      <Button
                        variant='plain'
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </Button>
                    }
                  />
                  {errors.password && (
                    <InputError message={errors.password.message} />
                  )}
                </FormControl>
                <Stack gap={4} sx={{ mt: 2 }}>
                  {/* <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      alignItems: 'center'
                    }}
                  >
                    <Link level='title-sm' href='#replace-with-a-link'>
                      Quên Mật Khẩu?
                    </Link>
                  </Box> */}
                  <Button type='submit' fullWidth disabled={isPending}>
                    Đăng Nhập
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
          <Box component='footer' sx={{ py: 3 }}>
            <Typography level='body-xs' textAlign='center'>
              © Sacabanks. All Rights Reserved - releases v.2 -{' '}
              {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: '100%',
          position: 'fixed',
          right: 0,
          top: 0,
          bottom: 0,
          left: { xs: 0, md: '50vw' },
          transition:
            'background-image var(--Transition-duration), left var(--Transition-duration) !important',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          backgroundColor: 'background.level1',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundImage:
            'url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2)',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundImage:
              'url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831?auto=format&w=1000&dpr=2)'
          }
        })}
      />
    </>
  )
}

function GoogleIcon() {
  return (
    <SvgIcon fontSize='xl'>
      <g transform='matrix(1, 0, 0, 1, 27.009001, -39.238998)'>
        <path
          fill='#4285F4'
          d='M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z'
        />
        <path
          fill='#34A853'
          d='M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z'
        />
        <path
          fill='#FBBC05'
          d='M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z'
        />
        <path
          fill='#EA4335'
          d='M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z'
        />
      </g>
    </SvgIcon>
  )
}
