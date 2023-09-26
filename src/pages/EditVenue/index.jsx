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
import { useEffect } from 'react'
import api from '../../data/apiBase'
import { useState } from 'react'
import storage from '../../storage'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

function EditVenue() {
  setTitle('Edit venue')

  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    media: yup.string(),
    maxGuests: yup.number().positive('Max Guests must be a positive number'),
    rating: yup
      .number()
      .required('Rating is required')
      .min(1, 'Rating must be at least 0')
      .max(5, 'Rating must be at most 5'),
    price: yup.number().positive('Price must be a positive number'),
    description: yup.string(),
    wifi: yup.boolean(),
    parking: yup.boolean(),
    breakfast: yup.boolean(),
    pets: yup.boolean(),
    address: yup.string(),
    city: yup.string(),
    zip: yup.string(),
    country: yup.string(),
    continent: yup.string(),
    longitude: yup.string(),
    latitude: yup.string(),
  })

  const { id } = useParams()
  const [name, setName] = useState('')
  const [media, setMedia] = useState('')
  const [maxGuests, setMaxGuests] = useState(Number(0))
  const [rating, setRating] = useState(Number(0))
  const [price, setPrice] = useState(Number(0))
  const [description, setDescription] = useState('')
  const [wifi, setWifi] = useState(false)
  const [parking, setParking] = useState(false)
  const [breakfast, setBreakfast] = useState(false)
  const [pets, setPets] = useState(false)
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [zip, setZip] = useState('')
  const [country, setCountry] = useState('')
  const [continent, setContinent] = useState('')
  const [longitude, setLongitude] = useState('')
  const [latitude, setLatitude] = useState('')

  const form = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: name,
      media: media,
      max_guests: maxGuests,
      rating: rating,
      price: price,
      description: description,
      wifi: wifi,
      parking: parking,
      breakfast: breakfast,
      pets: pets,
      address: address,
      city: city,
      zip: zip,
      country: country,
      continent: continent,
      longitude: longitude,
      latitude: latitude,
    },
  })

  const {
    handleSubmit,
    formState: { errors },
  } = form

  const onsubmit = async () => {
    // if(errors.length === 0) {
    const data = {
      name: name,
      media: media,
      maxGuests: maxGuests,
      rating: rating,
      price: price,
      description: description,
      meta: {
        wifi: wifi,
        parking: parking,
        breakfast: breakfast,
        pets: pets,
      },
      location: {
        address: address,
        city: city,
        zip: zip,
        country: country,
        continent: continent,
        longitude: longitude,
        latitude: latitude,
      },
    }

    console.log(data)
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
  // }

  useEffect(() => {
    const fetchVenue = async () => {
      const response = await api.get('/venues/' + id)
      try {
        setName(response.data.name)
        setMedia(response.data.media)
        setMaxGuests(response.data.maxGuests)
        setRating(response.data.rating)
        setPrice(response.data.price)
        setDescription(response.data.description)
        setWifi(response.data.meta.wifi)
        setParking(response.data.meta.parking)
        setBreakfast(response.data.meta.breakfast)
        setPets(response.data.meta.pets)
        setAddress(response.data.location.address)
        setCity(response.data.location.city)
        setZip(response.data.location.zip)
        setCountry(response.data.location.country)
        setContinent(response.data.location.continent)
        setLongitude(response.data.location.longitude)
        setLatitude(response.data.location.latitude)
      } catch (error) {
        console.log(error)
      }
    }
    fetchVenue()
  }, [form, id])

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
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={media ? media : ''}
                onChange={(e) => setMedia([e.target.value])}
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
                value={maxGuests ? maxGuests : ''}
                onChange={(e) => setMaxGuests(e.target.value)}
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
                value={rating ? rating : ''}
                onChange={(e) => setRating(e.target.value)}
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
                value={price ? price : ''}
                onChange={(e) => setPrice(e.target.value)}
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
                value={description ? description : ''}
                onChange={(e) => setDescription(e.target.value)}
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
                control={<Switch checked={wifi} onClick={handleWifiChange} />}
                label="Wifi"
                labelPlacement="start"
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
                value={address ? address : ''}
                onChange={(e) => setAddress(e.target.value)}
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
                value={city ? city : ''}
                onChange={(e) => setCity(e.target.value)}
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
                value={zip ? zip : ''}
                onChange={(e) => setZip(e.target.value)}
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
                value={country ? country : ''}
                onChange={(e) => setCountry(e.target.value)}
                type="text"
              ></TextField>
              {errors.country && (
                <Typography variant="body1" color="error">
                  {errors.country.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" color="initial">
                Continent
              </Typography>
              <TextField
                sx={{ width: '100%' }}
                value={continent ? continent : ''}
                onChange={(e) => setContinent(e.target.value)}
                type="text"
              ></TextField>
              {errors.continent && (
                <Typography variant="body1" color="error">
                  {errors.continent.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" color="initial">
                Longitude
              </Typography>
              <TextField
                sx={{ width: '100%' }}
                value={longitude ? longitude : ''}
                onChange={(e) => setLongitude(e.target.value)}
                type="text"
              ></TextField>
              {errors.longitude && (
                <Typography variant="body1" color="error">
                  {errors.longitude.message}
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
                Latitude
              </Typography>
              <TextField
                sx={{ width: '50%' }}
                value={latitude ? latitude : ''}
                onChange={(e) => setLatitude(e.target.value)}
                type="text"
              ></TextField>
              {errors.latitude && (
                <Typography variant="body1" color="error">
                  {errors.latitude.message}
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
