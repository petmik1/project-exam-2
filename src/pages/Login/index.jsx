import { TextField, Button, Stack, Link } from '@mui/material'
import { useForm } from 'react-hook-form'

function Login() {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { register, handleSubmit } = form

  const onsubmit = (data) => {
    console.log(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onsubmit)}
      style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop:'5rem'}}
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
        ></TextField>
        <TextField
          label="Password"
          type="password"
          {...register('password')}
        ></TextField>
        <Link color="primary" href="/register">Dont have a user? Register here.</Link>
        <Button variant="contained" type="submit">
          Login
        </Button>
      </Stack>
    </form>
  )
}

export default Login
