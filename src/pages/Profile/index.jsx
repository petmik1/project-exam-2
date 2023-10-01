import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { useState } from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ProfilePicture from '../../components/ProfilePicture'
import setTitle from '../../components/setTitle'
import storage from '../../storage'
import api from '../../data/apiBase'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import './styles.css'
import { Alert, AlertTitle, CircularProgress } from '@mui/material'
import dayjs from 'dayjs'

function Profile() {
  setTitle('Profile')
  const [value, setValue] = useState('1')
  const [bookings, setBookings] = useState([])
  const [venues, setVenues] = useState([])
  const [user] = useState(storage.load('user'))
  const [activeStep, setActiveStep] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')
  const [errorType, setErrorType] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true)
        const response = await api.get(
          '/profiles/' + user.name + '/bookings' + '?_venue=true',
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          }
        )
        setBookings(response.data)
      } catch (error) {
        setErrorMessage(error.toJSON().message)
        setErrorType('Fetch bookings failed')
      } finally {
        setLoading(false)
      }
    }
    fetchBookings()
    if (user.venueManager) {
      const fetchVenues = async () => {
        try {
          setLoading(true)
          const response = await api.get('/profiles/' + user.name + '/venues', {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          })
          setVenues(response.data)
        } catch (error) {
          setErrorMessage(error.toJSON().message)
          setErrorType('Fetch venues failed')
        } finally {
          setLoading(false)
        }
      }
      fetchVenues()
    }
  }, [user, user.accessToken, user.name, user.venueManager])

  const handleChange = (event, newValue) => {
    setValue(newValue)
    setActiveStep(0)
  }

  return (
    <>
      <Box maxWidth={'800px'} margin={'1rem auto'}>
        <Alert
          severity="error"
          sx={{ display: errorMessage ? 'flex' : 'none' }}
        >
          <AlertTitle sx={{ fontWeight: 'bold' }}>{errorType}</AlertTitle>
          {errorMessage}
        </Alert>
        <CircularProgress
          sx={{ margin: '0 auto', display: loading ? 'block' : 'none' }}
        />
      </Box>
      {<ProfilePicture />}

      <Box display={'flex'} justifyContent={'center'} mt={'2rem'}>
        <Box maxWidth={'650px'} width={'100%'}>
          <TabContext value={value}>
            <Box pl={'1rem'}>
              <TabList
                onChange={handleChange}
                aria-label="booking or venues tabs"
              >
                <Tab label="bookings" value="1" />
                <Tab
                  label="venues"
                  sx={{ display: user.venueManager ? 'block' : 'none' }}
                  value="2"
                />
              </TabList>
            </Box>
            <TabPanel
              value="1"
              sx={{
                border: 3,
                borderColor: 'primary.main',
                borderRadius: '10px',
              }}
            >
              <Box
                display={
                  bookings.length > 0 ? { xs: 'block', md: 'flex' } : 'none'
                }
                justifyContent={'space-between'}
                flexDirection={{ xs: 'column', md: 'row' }}
                width={'100%'}
              >
                <Box width={'100%'}>
                  <Box
                    component={Swiper}
                    pagination={true}
                    modules={[Pagination]}
                  >
                    {bookings.map((booking) => (
                      <SwiperSlide key={booking.id}>
                        <Box
                          display={{ xs: 'block', md: 'flex' }}
                          justifyContent={'space-evenly'}
                          flexDirection={'row'}
                          key={booking.id}
                        >
                          {booking.venue.media[0] && (
                            <img
                              src={booking.venue.media[0]}
                              alt=""
                              style={{
                                borderRadius: '20px',
                                border: '3px solid',
                                borderColor: '#00679F',
                                maxWidth: '300px',
                                maxHeight: '300px',
                              }}
                            />
                          )}
                          <Box
                            display={'flex'}
                            flexDirection={'column'}
                            gap={'2rem'}
                          >
                            <Typography
                              variant="h2"
                              textAlign={{ md: 'center' }}
                            >
                              {booking.venue.name}
                            </Typography>
                            <Typography
                              variant="h2"
                              textAlign={{ md: 'center' }}
                            >
                              {dayjs(booking.dateFrom).format('DD.MM.YY')} -{' '}
                              {dayjs(booking.dateTo).format('DD.MM.YY')}
                            </Typography>
                            <Typography
                              variant="h2"
                              textAlign={{ md: 'center' }}
                            >
                              guests: {booking.guests}
                            </Typography>
                            <Typography
                              variant="h2"
                              textAlign={{ md: 'center' }}
                            >
                              {booking.price}
                            </Typography>
                          </Box>
                        </Box>
                      </SwiperSlide>
                    ))}
                  </Box>
                </Box>
              </Box>
              <Box display={bookings.length > 0 ? 'none' : 'block'}>
                <Typography variant="h2" textAlign={{ md: 'center' }}>
                  you have no bookings
                </Typography>
              </Box>
            </TabPanel>
            <TabPanel
              value="2"
              sx={{
                border: 3,
                borderColor: 'primary.main',
                borderRadius: '10px',
              }}
            >
              <Box
                display={
                  venues.length > 0 ? { xs: 'block', md: 'flex' } : 'none'
                }
                justifyContent={'space-between'}
                flexDirection={{ xs: 'column', md: 'row' }}
                width={'100%'}
              >
                <Box width={'100%'}>
                  <Box
                    component={Swiper}
                    pagination={true}
                    modules={[Pagination]}
                  >
                    {venues.map((venue) => (
                      <SwiperSlide key={venue.id}>
                        <Box
                          display={{ xs: 'block', md: 'flex' }}
                          justifyContent={'space-evenly'}
                          flexDirection={'row'}
                          key={venue.id}
                        >
                          <img
                            src={venue.media[0]}
                            alt=""
                            style={{
                              borderRadius: '20px',
                              border: '3px solid',
                              borderColor: '#00679F',
                              maxWidth: '300px',
                              maxHeight: '300px',
                            }}
                          />
                          <Box>
                            <Typography
                              variant="h2"
                              textAlign={{ md: 'center' }}
                            >
                              {venue.name}
                            </Typography>
                            <Box
                              display={'flex'}
                              flexDirection={'column'}
                              justifyContent={'center'}
                              alignItems={'center'}
                            >
                              <Link to={`/editVenue/${venue.id}`}>
                                <Button
                                  variant="contained"
                                  sx={{ margin: '1rem 0' }}
                                >
                                  Edit
                                </Button>
                              </Link>
                              <Link to={`/venueList/${venue.id}`}>
                                <Button variant="contained">
                                  view bookings
                                </Button>
                              </Link>
                            </Box>
                          </Box>
                        </Box>
                      </SwiperSlide>
                    ))}
                  </Box>
                </Box>
              </Box>
              <Box display={venues.length > 0 ? 'none' : 'block'}>
                <Typography variant="h2" textAlign={{ md: 'center' }}>
                  you have no venues
                </Typography>
              </Box>
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </>
  )
}

export default Profile
