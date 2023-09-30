import {
  TextField,
  Button,
  Stack,
  Link,
  Typography,
  Alert,
  AlertTitle,
  CircularProgress,
  Box,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import setTitle from '../../components/setTitle'
import api from '../../data/apiBase'
import storage from '../../storage'
import { useState } from 'react'

function Login() {
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

  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

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
      setLoading(true)
      const response = await api.post('/auth/login', data)
      storage.save('user', response.data)
      storage.save('avatar', response.data.avatar)
      location.href = '/'
    } catch (error) {
      setErrorMessage(error.toJSON().message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Typography variant="h1" textAlign={'center'} mt="2rem">
        Login
      </Typography>
      <Box maxWidth={'800px'} margin={'1rem auto'}>
        <Alert severity="error" sx={{display: errorMessage ? 'flex' : 'none' }}>
          <AlertTitle sx={{ fontWeight: 'bold' }}>login error</AlertTitle>
          {errorMessage}
        </Alert>
        <CircularProgress
          sx={{ margin: '0 auto', display: loading ? 'block' : 'none' }}
        />
      </Box>

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
