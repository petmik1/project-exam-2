import {
  Box,
  Button,
  Grid,
  List,
  ListItemText,
  Typography,
  Slider,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import setTitle from '../../components/setTitle'
import api from '../../data/apiBase'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import _ from 'lodash'
import CheckIcon from '@mui/icons-material/Check'
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb'
import { useForm } from 'react-hook-form'
import storage from '../../storage'

const tomorrow = dayjs().add(1, 'day')
const dayAfterTomorrow = dayjs().add(2, 'day')

function Product() {
  const [venue, setVenue] = useState([])
  // const [guest, setGuest] = useState(1)
  const { id } = useParams()
  const form = useForm({
    defaultValues: {
      from: tomorrow,
      to: dayAfterTomorrow,
      guests: Number(1),
    },
  })

  const { register, handleSubmit } = form

  useEffect(() => {
    const fetchVenue = async () => {
      const response = await api.get('/venues/' + id)
      try {
        setVenue(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchVenue()
  }, [id])

  const createBooking = async (data) => {
    const booking = {
      dateFrom: dayjs(data.from).format('YYYY-MM-DD'),
      dateTo: dayjs(data.to).format('YYYY-MM-DD'),
      venueId: id,
      guests: Number(data.guests) ,
    }
    console.log(booking)
    try {
      const response = await api.post('/bookings', booking, {
        headers: {
          Authorization: `Bearer ${storage.load('user').accessToken}`,
        },
      })
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  let meta = _.get(venue, 'meta', {})
  let location = _.get(venue, 'location', {})

  setTitle(venue.location)

  return (
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
              <ListItemText primary={'rating: ' + venue.rating + '/10'} />
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
            {Object.values(location).map((value, index) => (
              <ListItemText
                primary={Object.keys(location)[index] + ': ' + value}
                key={index}
              />
            ))}
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
            <DatePicker defaultValue={tomorrow} {...register('from')} />
            <Typography variant="h2">to</Typography>
            <DatePicker defaultValue={dayAfterTomorrow} {...register('to')} />
            <Typography variant="h2">guests</Typography>
            <Slider
              aria-label="guests"
              defaultValue={1}
              // onChange={(e) => setGuest(e.target.value)}
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
  )
}

export default Product
