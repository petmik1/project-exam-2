import { Box, Paper, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import setTitle from '../../components/setTitle'
import api from '../../data/apiBase'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function Home() {
  const [venues, setVenues] = useState([])
  

  useEffect(() => {
    const fetchVenues = async () => {
      const response = await api.get('/venues')
      try {
        setVenues(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchVenues()
  }, [])

  setTitle('Home')

  return (
    <Box p="2rem" display={'flex'} flexDirection={'column'}>
      <Box margin={'0 auto'} pb={'2rem'}>
        <TextField
          id="outlined-basic"
          label="Search..."
          variant="outlined"
          sx={{ maxWidth: '550px' }}
        />
      </Box>

      <Grid
        container
        spacing={2}
        justifyContent={'center'}
        alignContent={'center'}
        height={'100%'}
      >
        {venues.map((venue) => {
          return (
            <Grid item xs={12} md={3} key={venue.id}>
              <Link to={`/product/${venue.id}`}  style={{textDecoration:'none'}}>
                <Paper variant="secondary">
                  <img
                    src={venue.media}
                    style={{ maxHeight: '200px', minHeight: '200px' }}
                    alt=""
                  />
                  <Box
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                  >
                    <Typography variant="h2" color="">
                      {venue.name}
                    </Typography>
                    <Typography variant="body1" color="">
                      {venue.location.city}
                    </Typography>
                  </Box>
                </Paper>
              </Link>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

export default Home
