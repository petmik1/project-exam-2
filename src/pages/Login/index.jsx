import { TextField, Button, Stack, Link, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import setTitle from '../../components/setTitle'
import api from '../../data/apiBase'
import storage from '../../storage'

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email')
    .matches(
      '^[a-zA-Z0-9._%+-]+@(noroff.no|stud.noroff.no)$',
      'The Email has to be a Noroff email address'
    ),
  password: yup.string().required('Password is required'),
})

function Login() {
  setTitle('Login')
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  const onsubmit = async (data) => {
    try {
      const response = await api.post('/auth/login', data)
      storage.save('user', response.data)
      storage.save('avatar', response.data.avatar)
      location.href = '/'
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.errors[0].message)
      } else if (error.request) {
        console.log(error.request)
      } else {
        console.log('Error', error.message)
      }
    }
  }

  return (
    <>
      <Typography variant="h1" textAlign={'center'} mt="2rem">
        Login
      </Typography>
      <form
        onSubmit={handleSubmit(onsubmit)}
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          marginTop: '2rem',
        }}
        noValidate
      >
        <Stack
          spacing={2}
          sx={{
            width: '100%',
            maxWidth: '400px',
          }}
        >
          <TextField
            label="Email"
            type="email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          ></TextField>
          <TextField
            label="Password"
            type="password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          ></TextField>
          <Link data-testid="register-link" color="primary" href="/register">
            Don't have a user? Register here.
          </Link>
          <Button variant="contained" type="submit">
            Login
          </Button>
        </Stack>
      </form>
    </>
  )
}

export default Login
