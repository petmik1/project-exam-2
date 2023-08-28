import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { useState } from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
// import ProfilePicture from '../../components/profilePicture'
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'

function Profile() {
  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      <Box>
        {/* <ProfilePicture/> */}
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}

        >
          <PermIdentityOutlinedIcon
            sx={{
              width: '150px',
              height: '150px',
              border: '3px solid',
              borderColor: 'primary.main',
              borderRadius: '100%',
            }}
          />
          <SettingsOutlinedIcon sx={{ marginLeft:'6rem'}} />
          <Typography variant="h1">name</Typography>
        </Box>
      </Box>
      <Box maxWidth={'1000px'}>
        <TabContext value={value}>
          <Box pl={'1rem'}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="venues" value="1" />
              <Tab label="bookings" value="2" />
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
            <Box>
              <img src="/product.png" alt="" />
              <Box
                display={{ xs: 'block', md: 'flex' }}
                justifyContent={'space-between'}
              >
                <Typography variant="h2">header</Typography>
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
    </>
  )
}

export default Profile
