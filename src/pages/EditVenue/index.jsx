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

function EditVenue() {
  setTitle('Edit venue')

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
    defaultValues: {
      name: '',
      media: '',
      max_guests: '',
      rating: '',
      price: '',
      description: '',
      wifi: '',
      parking: '',
      breakfast: '',
      pets: '',
      address: '',
      city: '',
      zip: '',
      country: '',
      continent: '',
      longitude: '',
      latitude: '',
    },
  })

  const { handleSubmit } = form

  const onsubmit = async () => {
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
              <FormControlLabel
                control={
                  <Switch checked={parking} onClick={handleParkingChange} />
                }
                label="Parking"
                labelPlacement="start"
              />

              <FormControlLabel
                control={
                  <Switch checked={breakfast} onClick={handleBreakfastChange} />
                }
                label="Breakfast"
                labelPlacement="start"
              />
              <FormControlLabel
                control={<Switch checked={pets} onClick={handlePetsChange} />}
                label="Pets"
                labelPlacement="start"
              />
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
