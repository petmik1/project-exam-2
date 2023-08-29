import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { useState } from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ProfilePicture from '../../components/profilePicture'

function Profile() {
  const [value, setValue] = useState('1')

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
                <Tab label="venues" value="1" />
                <Tab label="bookings" disabled value="2" />
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
                display={{ xs: 'block', md: 'flex' }}
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
            </TabPanel>
            <TabPanel
              value="2"
              sx={{
                border: 3,
                borderColor: 'primary.main',
                borderRadius: '10px',
              }}
            >
              Item Two
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </>
  )
}

export default Profile
