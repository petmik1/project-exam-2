import {
  Box,
  Button,
  Grid,
  List,
  ListItemText,
  Typography,
  Slider,
  Alert,
  AlertTitle,
  CircularProgress,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import setTitle from '../../components/setTitle'
import api from '../../data/apiBase'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import _ from 'lodash'
import CheckIcon from '@mui/icons-material/Check'
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb'
import { useForm } from 'react-hook-form'
import storage from '../../storage'

function Product() {
  const [venue, setVenue] = useState([])
  const [from, setFrom] = useState(null)
  const [to, setTo] = useState(null)
  const [bookings, setBookings] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [errorMessageCreate, setErrorMessageCreate] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  const form = useForm({
    defaultValues: {
      from: '',
      to: '',
      guests: Number(1),
    },
  })

  const disabledDateRanges = []

  if (bookings.length > 0) {
    bookings.forEach((booking) => {
      disabledDateRanges.push({
        start: booking.dateFrom,
        end: booking.dateTo,
      })
    })
  }
  const shouldDisableDate = (date) => {
    return disabledDateRanges.some((range) => {
      return date.isBetween(range.start, range.end, null, '[]')
    })
  }

  const { register, handleSubmit } = form

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        setLoading(true)
        const response = await api.get('/venues/' + id + '/?_bookings=true')
        setVenue(response.data)
        setBookings(response.data.bookings)
      } catch (error) {
        setErrorMessage(error.toJSON().message)
      } finally {
        setLoading(false)
      }
    }
    fetchVenue()
  }, [id])

  const createBooking = async (data) => {
    const booking = {
      dateFrom: from.toISOString(),
      dateTo: to.toISOString(),
      venueId: id,
      guests: Number(data.guests),
    }

    try {
      setLoading(true)
      const response = await api.post('/bookings', booking, {
        headers: {
          Authorization: `Bearer ${storage.load('user').accessToken}`,
        },
      })
      if (200 >= response.status <= 299) {
        setSuccess(true)
      }
    } catch (error) {
      setErrorMessageCreate(error.toJSON().message)
    } finally {
      setLoading(false)
    }
  }

  let meta = _.get(venue, 'meta', {})
  let location = _.get(venue, 'location', {})

  setTitle(venue.location)

  return (
    <>
      <Box maxWidth={'800px'} margin={'1rem auto'}>
        <Alert
          severity="error"
          sx={{ display: errorMessage ? 'flex' : 'none' }}
        >
          <AlertTitle sx={{ fontWeight: 'bold' }}>
            Fetch listing error
          </AlertTitle>
          {errorMessage}
        </Alert>
        <Alert
          severity="error"
          sx={{ display: errorMessageCreate ? 'flex' : 'none' }}
        >
          <AlertTitle sx={{ fontWeight: 'bold' }}>
            Fetch listing error
          </AlertTitle>
          {errorMessage}
        </Alert>
        <Alert severity="success" sx={{ display: success ? 'flex' : 'none' }}>
          <AlertTitle sx={{ fontWeight: 'bold' }}>
            your booking has been created
          </AlertTitle>
          {errorMessage}
        </Alert>
        <CircularProgress
          sx={{ margin: '0 auto', display: loading ? 'block' : 'none' }}
        />
      </Box>
      <Box m={{ xs: '1rem', md: '5rem' }}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={6}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'left'}
          >
            <img
              src={venue.media}
              alt=""
              width={'90%'}
              style={{
                borderRadius: '20px',
                border: '3px solid',
                borderColor: '#00679F',
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display={'flex'} flexDirection={'column'} alignItems={'left'}>
              <Typography variant={'h1'}></Typography>
              <List>
                <ListItemText primary={'price: $' + venue.price} />
                <ListItemText primary={'max guests: ' + venue.maxGuests} />
                <ListItemText primary={'rating: ' + venue.rating + '/5'} />
                <ListItemText primary={'location: ' + location.city} />
                <Typography variant="body1" color="initial">
                  {venue.description}
                </Typography>
              </List>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <List sx={{ display: 'flex', width: '50%' }}>
              <ListItemText primary={'wifi:'} />
              <ListItemText
                primary={meta.wifi ? <CheckIcon /> : <DoNotDisturbIcon />}
              />
            </List>
            <List sx={{ display: 'flex', width: '50%' }}>
              <ListItemText primary={'Parking:'} />
              <ListItemText
                primary={meta.parking ? <CheckIcon /> : <DoNotDisturbIcon />}
              />
            </List>
            <List sx={{ display: 'flex', width: '50%' }}>
              <ListItemText primary={'Breakfast:'} />
              <ListItemText
                primary={meta.breakfast ? <CheckIcon /> : <DoNotDisturbIcon />}
              />
            </List>
            <List sx={{ display: 'flex', width: '50%' }}>
              <ListItemText primary={'Pets:'} />
              <ListItemText
                primary={meta.pets ? <CheckIcon /> : <DoNotDisturbIcon />}
              />
            </List>
            <List>
              <ListItemText primary={'address: ' + location.address} />
              <ListItemText primary={'city: ' + location.city} />
              <ListItemText primary={'country: ' + location.country} />
              <ListItemText primary={'zip: ' + location.zip} />
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component={'form'}
              onSubmit={handleSubmit(createBooking)}
              display={'flex'}
              flexDirection={'column'}
            >
              <Typography variant="h2">from</Typography>
              <DatePicker
                value={from}
                disablePast
                shouldDisableDate={shouldDisableDate}
                onChange={(e) => setFrom(e)}
              />
              <Typography variant="h2">to</Typography>
              <DatePicker
                value={to}
                disablePast
                minDate={from}
                shouldDisableDate={shouldDisableDate}
                onChange={(e) => setTo(e)}
              />
              <Typography variant="h2">guests</Typography>
              <Slider
                aria-label="guests"
                defaultValue={1}
                {...register('guests')}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={venue.maxGuests}
              />
              <Button variant="contained" type="submit">
                Create booking
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Product
