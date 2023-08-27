import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { useState } from 'react'


function Profile() {
  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box>
      <TabContext value={value}>
        <Box pl={'1rem'}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab
              label="Item One"
              value="1"
            />
            <Tab
              label="Item Two"
              value="2"
            />
            <Tab
              label="Item Three"
              value="3"
            />
          </TabList>
        </Box>
        <TabPanel
          value="1"
          sx={{ border: 3, borderColor: 'primary.main', borderRadius: '10px' }}
        >
          Item One
        </TabPanel>
        <TabPanel
          value="2"
          sx={{ border: 3, borderColor: 'primary.main', borderRadius: '10px' }}
        >
          Item Two
        </TabPanel>
        <TabPanel
          value="3"
          sx={{ border: 3, borderColor: 'primary.main', borderRadius: '10px' }}
        >
          Item Three
        </TabPanel>
      </TabContext>
    </Box>
  )
}

export default Profile
