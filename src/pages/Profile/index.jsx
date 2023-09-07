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

function Profile() {
  setTitle('Profile')
  const [value, setValue] = useState('1')
  const [bookings, setBookings] = useState([])
  const [user, setUser] = useState(storage.load('user'))

  useEffect(() => {
    const fetchVenues = async () => {
      const response = await api.get('/profiles/' + user.name + '/bookings', {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
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
                aria-label="lab API tabs example"
              >
                <Tab label="bookings" value="1" />
                <Tab label="venues" sx={{display: user.venueManager ? 'block' : 'none'}}  value="2" />
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
              >
                <img src="/product.png" alt="" />
                <Box
                  display={{ xs: 'block', md: 'flex' }}
                  justifyContent={'center'}
                  alignContent={'center'}
                  flexDirection={'column'}
                >
                  <Typography variant="h2" textAlign={{ md: 'center' }}>
                    header
                  </Typography>
                  <Button variant="contained">more info</Button>
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
                <img src="/product.png" alt="" />
                <Box
                  display={{ xs: 'block', md: 'flex' }}
                  justifyContent={'center'}
                  alignContent={'center'}
                  flexDirection={'column'}
                >
                  <Typography variant="h2" textAlign={{ md: 'center' }}>
                    header
                  </Typography>
                  <Button variant="contained">more info</Button>
                </Box>
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
