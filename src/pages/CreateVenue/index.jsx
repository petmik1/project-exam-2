import {
  Typography,
  Box,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Grid,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import setTitle from '../../components/setTitle'
import api from '../../data/apiBase'
import { useState } from 'react'
import storage from '../../storage'

function CreateVenue() {
  setTitle('Create venue')
  const form = useForm({
    defaultValues: {
      name: '',
      media: [''],
      maxGuests: Number(),
      rating: Number(),
      price: Number(),
      description: '',
      wifi: '',
      parking: '',
      breakfast: '',
      location: {
        address: '',
        city: '',
        zip: '',
        country: '',
        continent: '',
        longitude: '',
        latitude: '',
      },
    },
  })

  const { register, handleSubmit } = form
  const [user] = useState(storage.load('user'))

  const onsubmit = async (data) => {
    console.log(data)
    const response = await api.post('/venues', data,
    {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
    try {
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box>
      <Typography variant="h1" textAlign={'center'}>
        Create venue
      </Typography>

      <Box maxWidth={'800px'} margin={'1rem auto'}>
        <Typography variant="h2" textAlign={'left'}>
          General
        </Typography>
      </Box>
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Box
          component="form"
          onSubmit={handleSubmit(onsubmit)}
          display={'flex'}
          flexDirection={'column'}
          maxWidth={'800px'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Grid container spacing={2} justifyContent={'center'}>
            <Grid item xs={12} md={6}>
              <TextField
                sx={{ width: '100%' }}
                label="name"
                type="text"
                {...register('name')}
              ></TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                sx={{ width: '100%' }}
                label="max_guests"
                type="number"
                inputProps={{ min: 0 }}
                {...register('maxGuests', { valueAsNumber: true })}
              ></TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                sx={{ width: '100%' }}
                label="rating"
                type="number"
                inputProps={{ min: 0, max: 5 }}
                {...register('rating', { valueAsNumber: true })}
              ></TextField>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <TextField
                sx={{ width: '100%' }}
                label="price"
                type="number"
                inputProps={{ min: 0 }}
                {...register('price', { valueAsNumber: true })}
              ></TextField>
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <TextField
                sx={{ width: '100%' }}
                label="media"
                type="text"
                {...register('media[0]')}
              ></TextField>
            </Grid>

            <Grid
              item
              xs={12}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <TextField
                sx={{ width: '50%' }}
                label="description"
                type="text"
                {...register('description')}
              ></TextField>
            </Grid>
            <Grid
              item
              xs={12}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              flexDirection={'column'}
            >
              <FormControlLabel
                {...register('wifi')}
                control={<Switch />}
                label="Wifi"
              />
              <FormControlLabel
                {...register('parking')}
                control={<Switch />}
                label="Parking"
              />

              <FormControlLabel
                {...register('breakfast')}
                control={<Switch />}
                label="Breakfast"
              />
              <FormControlLabel
                {...register('pets')}
                control={<Switch />}
                label="Pets"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                sx={{ width: '100%' }}
                label="address"
                type="text"
                {...register('location.address')}
              ></TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                sx={{ width: '100%' }}
                label="city"
                type="text"
                {...register('location.city')}
              ></TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                sx={{ width: '100%' }}
                label="zip"
                type="text"
                {...register('location.zip')}
              ></TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                sx={{ width: '100%' }}
                label="country"
                type="text"
                {...register('location.country')}
              ></TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                sx={{ width: '100%' }}
                label="continent"
                type="text"
                {...register('location.continent')}
              ></TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                sx={{ width: '100%' }}
                label="longitude"
                type="text"
                {...register('location.longitude')}
              ></TextField>
            </Grid>
            <Grid
              item
              xs={12}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <TextField
                sx={{ width: '50%' }}
                label="latitude"
                type="text"
                {...register('location.latitude')}
              ></TextField>
            </Grid>
          </Grid>

          <Button type="submit" variant="contained" sx={{ marginTop: '1rem' }}>
            Create
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default CreateVenue
