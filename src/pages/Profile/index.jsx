import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { useState } from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ProfilePicture from '../../components/profilePicture'
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

function Profile() {
  setTitle('Profile')
  const [value, setValue] = useState('1')
  const [bookings, setBookings] = useState([])
  const [venues, setVenues] = useState([])
  const [user] = useState(storage.load('user'))
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const fetchBookings = async () => {
      const response = await api.get(
        '/profiles/' + user.name + '/bookings' + '?_venue=true',
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )

      try {
        setBookings(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchBookings()
    if (user.venueManager) {
      const fetchVenues = async () => {
        const response = await api.get('/profiles/' + user.name + '/venues', {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        })

        try {
          setVenues(response.data)
        } catch (error) {
          console.log(error)
        }
      }
      fetchVenues()
    }
  }, [user.accessToken, user.name, user.venueManager])

  const handleChange = (event, newValue) => {
    setValue(newValue)
    setActiveStep(0)
  }

  return (
    <>
      {<ProfilePicture />}

      <Box display={'flex'} justifyContent={'center'}>
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
                minHeight: '400px',
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
                          <Box>
                            <Typography
                              variant="h2"
                              textAlign={{ md: 'center' }}
                            >
                              {booking.venue.name}
                            </Typography>
                            <Link to={`/booking/${booking.id}`}>
                              <Button variant="contained">more info</Button>
                            </Link>
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
