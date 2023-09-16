import {
  TextField,
  Button,
  Grid,
  Link,
  Box,
  Typography,
  Switch,
  FormControlLabel,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import setTitle from '../../components/setTitle'
import api from '../../data/apiBase'

function Register() {
  setTitle('Register')
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      name: '',
      avatar: '',
      venueManager: '',
    },
  })

  const { register, handleSubmit } = form
  const onsubmit = async(data) => {
   
      
      try {
        await api.post('/auth/register', data)
        location.href = '/login'
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.errors[0].message)
        } else if (error.request) {
          console.log(error.request)
        } else {
          console.log('Error', error.message)
        }
      }
    
    register()

  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onsubmit)}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      marginTop={'2rem'}
      noValidate
    >
      <Typography variant="h1">Register</Typography>
      <Grid
        container
        spacing={2}
        justifyContent={'center'}
        align={'center'}
        sx={{
          maxWidth: '500px',
          mt: '2rem',
        }}
      >
        <Grid item xs={12} sm={6}>
          <TextField label="Name" type="text" {...register('name')}></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Email"
            type="email"
            {...register('email')}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Avatar"
            type="url"
            {...register('avatar')}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Password"
            type="password"
            {...register('password')}
          ></TextField>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            {...register('venueManager')}
            control={<Switch />}
            label="property manager"
          />
        </Grid>
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          width={'90%'}
        >
          <Link color="primary" href="/login" textAlign={'left'}>
            already have a user? login here
          </Link>
          <Button variant="contained" type="submit">
            Login
          </Button>
        </Box>
      </Grid>
    </Box>
  )
}

export default Register
