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
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  maxGuests: yup
    .number()
    .positive('Max Guests must be a positive number')
    .required('Max Guests is required'),
  rating: yup
    .number()
    .min(0, 'Rating must be at least 1')
    .max(5, 'Rating must be at most 5')
    .required('Rating is required'),
  price: yup
    .number()
    .positive('Price must be a positive number')
    .required('Price is required'),
  description: yup.string().required('Description is required'),
  wifi: yup.boolean(),
  parking: yup.boolean(),
  breakfast: yup.boolean(),
  pets: yup.boolean(),
  location: yup.object().shape({
    address: yup.string().required('Address is required'),
    city: yup.string().required('City is required'),
    zip: yup.string().required('ZIP code is required'),
    country: yup.string().required('Country is required'),
    continent: yup.string().required('Continent is required'),
    longitude: yup.string().required('Longitude is required'),
    latitude: yup.string().required('Latitude is required'),
  }),
  media: yup.array().of(yup.string().required('Media is required')),
})

function CreateVenue() {
  setTitle('Create venue')
  const form = useForm({
    defaultValues: {
      name: '',
      media: [''],
      maxGuests: Number(),
      rating: Number(1),
      price: Number(),
      description: '',
      meta: {
        wifi: '',
        parking: '',
        breakfast: '',
        pets: '',
      },
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
    resolver: yupResolver(validationSchema),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form
  const [user] = useState(storage.load('user'))

  const onsubmit = async (data) => {
    console.log(data)
    const response = await api.post('/venues', data, {
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

  console.log(errors.location?.address)

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
                error={!!errors.name}
                helperText={errors.name?.message}
              ></TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                sx={{ width: '100%' }}
                label="Max guests"
                type="number"
                inputProps={{ min: 0 }}
                {...register('maxGuests', { valueAsNumber: true })}
                error={!!errors.maxGuests}
                helperText={errors.maxGuests?.message}
              ></TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                sx={{ width: '100%' }}
                label="rating"
                type="number"
                {...register('rating', { valueAsNumber: true })}
                error={!!errors.rating}
                helperText={errors.rating?.message}
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
                error={!!errors.price}
                helperText={errors.price?.message}
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
                error={!!errors.media}
                helperText={errors.media?.message}
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
                error={!!errors.description}
                helperText={errors.description?.message}
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
                {...register('meta.wifi')}
                control={<Switch />}
                label="Wifi"
                error={!!errors.wifi}
                helperText={errors.wifi?.message}
              />
              <FormControlLabel
                {...register('meta.parking')}
                control={<Switch />}
                label="Parking"
                error={!!errors.parking}
                helperText={errors.parking?.message}
              />

              <FormControlLabel
                {...register('meta.breakfast')}
                control={<Switch />}
                label="Breakfast"
                error={!!errors.breakfast}
                helperText={errors.breakfast?.message}
              />
              <FormControlLabel
                {...register('meta.pets')}
                control={<Switch />}
                label="Pets"
                error={!!errors.pets}
                helperText={errors.pets?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                sx={{ width: '100%' }}
                label="address"
                type="text"
                {...register('location.address')}
                error={!!errors.location?.address}
              ></TextField>
              <Typography variant="error" color="initial">
                {errors.location?.address?.message}
              </Typography>
              
            </Grid>
            {/* <Grid item xs={12} md={6}>
              <TextField
                sx={{ width: '100%' }}
                label="city"
                type="text"
                {...register('location.city')}
                error={!!errors.location?.city}
                helperText={errors.location?.city.message}
              ></TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                sx={{ width: '100%' }}
                label="zip"
                type="text"
                {...register('location.zip')}
                error={!!errors.location?.zip}
                helperText={errors.location?.zip.message}
              ></TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                sx={{ width: '100%' }}
                label="country"
                type="text"
                {...register('location.country')}
                error={!!errors.location?.address}
                helperText={errors.location?.address.message}
              ></TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                sx={{ width: '100%' }}
                label="continent"
                type="text"
                {...register('location.continent')}
                error={!!errors.location?.continent}
                helperText={errors.location?.continent.message}
              ></TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                sx={{ width: '100%' }}
                label="longitude"
                type="text"
                {...register('location.longitude')}
                error={!!errors.location?.longitude}
                helperText={errors.location?.longitude.message}
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
                error={!!errors.location?.latitude}
                helperText={errors.location?.latitude.message}
              ></TextField>
            </Grid> */}
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
