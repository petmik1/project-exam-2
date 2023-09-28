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
import { useParams } from 'react-router-dom'
import api from '../../data/apiBase'
import { useState } from 'react'
import storage from '../../storage'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'


function EditVenue() {
  setTitle('Edit venue')

  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    media: yup.url,
    maxGuests: yup.number().positive('Max Guests must be a positive number'),
    rating: yup
      .number()
      .required('Rating is required')
      .min(1, 'Rating must be at least 0')
      .max(5, 'Rating must be at most 5'),
    price: yup.number().positive('Price must be a positive number'),
    description: yup.string(),
    meta: yup.object().shape({
    wifi: yup.boolean(),
    parking: yup.boolean(),
    breakfast: yup.boolean(),
    pets: yup.boolean(),
    }),
    location: yup.object().shape({
      address: yup.string(),
      city: yup.string(),
      zip: yup.string(),
      country: yup.string(),
    }),
  })

  const { id } = useParams()
  const [wifi, setWifi] = useState(false)
  const [parking, setParking] = useState(false)
  const [breakfast, setBreakfast] = useState(false)
  const [pets, setPets] = useState(false)


  const form = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: async () => {
      const response = await api.get('/venues/' + id)
      try {
        setWifi(response.data.meta.wifi)
        setParking(response.data.meta.parking)
        setBreakfast(response.data.meta.breakfast)
        setPets(response.data.meta.pets)

        return {
          name: response.data.name,
          media: response.data.media,
          maxGuests: response.data.maxGuests,
          rating: response.data.rating,
          price: response.data.price,
          description: response.data.description,
          meta: {
            wifi: response.data.meta.wifi,
            parking: response.data.meta.parking,
            breakfast: response.data.meta.breakfast,
            pets: response.data.meta.pets,
          },
          location: {
            address: response.data.location.address,
            city: response.data.location.city,
            zip: response.data.location.zip,
            country: response.data.location.country,
          },
        }
      } catch (error) {
        console.log(error)
      }
    },
  })
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  const onsubmit = async (data) => {
    const response = await api.put('/venues/' + id, data, {
      headers: {
        Authorization: `Bearer ${storage.load('user').accessToken}`,
      },
    })
    try {
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const handleWifiChange = (event) => {
    setWifi(event.target.checked)
  }
  const handleParkingChange = (event) => {
    setParking(event.target.checked)
  }
  const handleBreakfastChange = (event) => {
    setBreakfast(event.target.checked)
  }
  const handlePetsChange = (event) => {
    setPets(event.target.checked)
  }

  const deleteVenue = async () => {
    await api.delete('/venues/' + id, {
      headers: {
        Authorization: `Bearer ${storage.load('user').accessToken}`,
      },
    })
    try {
      location.href = '/profile'
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box>
      <Typography variant="h1" textAlign={'center'}>
        Edit venue
      </Typography>

      <Box
        maxWidth={'800px'}
        margin={'1rem auto'}
        display={'flex'}
        justifyContent={'space-between'}
      >
        <Typography variant="h2" textAlign={'left'}>
          General
        </Typography>
        <Button variant="contained" color="error" onClick={deleteVenue}>
          delete
        </Button>
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
              <Typography variant="body1" color="initial">
                Name
              </Typography>
              <TextField
                sx={{ width: '100%' }}
                {...register('name')}
                type="text"
              ></TextField>
              {errors.name && (
                <Typography variant="body1" color="error">
                  {errors.name.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" color="initial">
                Media
              </Typography>
              <TextField
                sx={{ width: '100%' }}
                {...register('media')}
                type="text"
              ></TextField>
              {errors.media && (
                <Typography variant="body1" color="error">
                  {errors.media.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" color="initial">
                Max guests
              </Typography>
              <TextField
                sx={{ width: '100%' }}
                {...register('maxGuests', { valueAsNumber: true })}
                type="text"
              ></TextField>
              {errors.maxGuests && (
                <Typography variant="body1" color="error">
                  {errors.maxGuests.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" color="initial">
                Rating
              </Typography>
              <TextField
                sx={{ width: '100%' }}
                {...register('rating', { valueAsNumber: true })}
                type="text"
              ></TextField>
              {errors.rating && (
                <Typography variant="body1" color="error">
                  {errors.rating.message}
                </Typography>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              flexDirection={'column'}
            >
              <Typography
                variant="body1"
                color="initial"
                textAlign={'left'}
                width={{ xs: '100%', md: '50%' }}
              >
                Price
              </Typography>
              <TextField
                sx={{ width: { xs: '100%', md: '50%' } }}
                {...register('price', { valueAsNumber: true })}
                type="text"
              ></TextField>
              {errors.price && (
                <Typography variant="body1" color="error">
                  {errors.price.message}
                </Typography>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Typography
                variant="body1"
                color="initial"
                textAlign={'left'}
                width={{ xs: '100%', md: '50%' }}
              >
                Description
              </Typography>
              <TextField
                sx={{ width: { xs: '100%', md: '50%' } }}
                {...register('description')}
                type="text"
              ></TextField>
              {errors.description && (
                <Typography variant="body1" color="error">
                  {errors.description.message}
                </Typography>
              )}
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
                control={<Switch checked={wifi} onChange={handleWifiChange} />}
                label="Wifi"
                labelPlacement="start"
                {...register('meta.wifi')}
                
              />
              {errors.wifi && (
                <Typography variant="body1" color="error">
                  {errors.wifi.message}
                </Typography>
              )}
              <FormControlLabel
                control={
                  <Switch checked={parking} onClick={handleParkingChange} />
                }
                label="Parking"
                labelPlacement="start"
                {...register('meta.parking')}
              />
              {errors.parking && (
                <Typography variant="body1" color="error">
                  {errors.parking.message}
                </Typography>
              )}
              <FormControlLabel
                control={
                  <Switch checked={breakfast} onClick={handleBreakfastChange} />
                }
                label="Breakfast"
                labelPlacement="start"
                {...register('meta.breakfast')}
              />
              {errors.breakfast && (
                <Typography variant="body1" color="error">
                  {errors.breakfast.message}
                </Typography>
              )}
              <FormControlLabel
                control={<Switch checked={pets} onClick={handlePetsChange} />}
                label="Pets"
                labelPlacement="start"
                {...register('meta.pets')}
              />
              {errors.pets && (
                <Typography variant="body1" color="error">
                  {errors.pets.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" color="initial">
                Address
              </Typography>
              <TextField
                sx={{ width: '100%' }}
                {...register('location.address')}
                type="text"
              ></TextField>
              {errors.address && (
                <Typography variant="body1" color="error">
                  {errors.address.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" color="initial">
                City
              </Typography>
              <TextField
                sx={{ width: '100%' }}
                {...register('location.city')}
                type="text"
              ></TextField>
              {errors.city && (
                <Typography variant="body1" color="error">
                  {errors.city.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" color="initial">
                Zip
              </Typography>

              <TextField
                sx={{ width: '100%' }}
                {...register('location.zip')}
                type="text"
              ></TextField>
              {errors.zip && (
                <Typography variant="body1" color="error">
                  {errors.zip.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" color="initial">
                Country
              </Typography>
              <TextField
                sx={{ width: '100%' }}
                {...register('location.country')}
                type="text"
              ></TextField>
              {errors.country && (
                <Typography variant="body1" color="error">
                  {errors.country.message}
                </Typography>
              )}
            </Grid>
          </Grid>

          <Button type="submit" variant="contained" sx={{ marginTop: '1rem' }}>
            Edit
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default EditVenue
