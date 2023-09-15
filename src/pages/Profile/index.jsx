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
import MobileStepper from '@mui/material/MobileStepper'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import SwipeableViews from 'react-swipeable-views'
import { useTheme } from '@mui/material/styles'
import { Link } from 'react-router-dom'

function Profile() {
  setTitle('Profile')
  const theme = useTheme()
  const [value, setValue] = useState('1')
  const [bookings, setBookings] = useState([])
  const [user, setUser] = useState(storage.load('user'))
  const [activeStep, setActiveStep] = useState(0)
  const maxSteps = bookings.length

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleStepChange = (step) => {
    setActiveStep(step)
  }

  useEffect(() => {
    const fetchVenues = async () => {
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
    fetchVenues()
  }, [user.name, user.accessToken])

  const handleChange = (event, newValue) => {
    setValue(newValue)
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
                  <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents
                  >
                    {bookings.map((booking) => (
                      <Box
                        display={{ xs: 'block', md: 'flex' }}
                        justifyContent={'space-between'}
                        alignContent={'space-between'}
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
                          <Typography variant="h2" textAlign={{ md: 'center' }}>
                            {booking.venue.name}
                          </Typography>
                          <Link to={`/booking/${booking.id}`}>
                            <Button variant="contained">more info</Button>
                          </Link>
                        </Box>
                      </Box>
                    ))}
                  </SwipeableViews>
                  <MobileStepper
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    sx={{
                      maxWidth: '300px',
                      flexGrow: 1,
                      margin: 'auto',
                      backgroundColor: 'transparent',
                    }}
                    nextButton={
                      <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                        color="primary"
                      >
                        Next
                        {theme.direction === 'rtl' ? (
                          <KeyboardArrowLeft />
                        ) : (
                          <KeyboardArrowRight />
                        )}
                      </Button>
                    }
                    backButton={
                      <Button
                        size="small"
                        onClick={handleBack}
                        disabled={activeStep === 0}
                        color="primary"
                      >
                        {theme.direction === 'rtl' ? (
                          <KeyboardArrowRight />
                        ) : (
                          <KeyboardArrowLeft />
                        )}
                        Back
                      </Button>
                    }
                  />
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
                  bookings.length > 0 ? { xs: 'block', md: 'flex' } : 'none'
                }
                justifyContent={'space-between'}
                flexDirection={{ xs: 'column', md: 'row' }}
              >
                {bookings.map((booking) => {
                  return (
                    <Box
                      display={{ xs: 'block', md: 'flex' }}
                      justifyContent={'center'}
                      alignContent={'center'}
                      flexDirection={'column'}
                      key={booking.id}
                    >
                      <img src={booking.venue.media[0]} alt="" />
                      <Typography variant="h2" textAlign={{ md: 'center' }}>
                        {booking.venue.name}
                      </Typography>
                      <Button variant="contained">more info</Button>
                    </Box>
                  )
                })}
              </Box>
              <Box display={bookings.length > 0 ? 'none' : 'block'}>
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
