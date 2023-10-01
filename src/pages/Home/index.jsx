import {
  Box,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import Grid from '@mui/material/Grid'
import setTitle from '../../components/setTitle'
import api from '../../data/apiBase'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'


function Home() {
  const [venues, setVenues] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  setTitle('Home')

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await api.get('venues/?sort=created&sortOrder=desc')
        setVenues(response.data)
        console.log(response.data)
      } catch (error) {
        setErrorMessage(error.toJSON().message)
      } finally {
        setLoading(false)
      }
    }
    fetchVenues()
  }, [loading])


  return (
    <Box p="2rem" display={'flex'} flexDirection={'column'}>
      
      <Box margin={'0 auto'} pb={'2rem'}>
        <TextField
          id="outlined-basic"
          label="Search..."
          variant="outlined"
          sx={{ maxWidth: '550px' }}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
          }}
        />
      </Box>

      <Box
        display={loading ? 'flex' : 'none'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <CircularProgress></CircularProgress>
      </Box>

      <Grid
        container
        spacing={2}
        justifyContent={'center'}
        alignContent={'center'}
        height={'100%'}
      >
        {errorMessage && (
          <Box textAlign={'center'}>
            <Typography variant="h2" color="initial">
              something went wrong
            </Typography>
            <Typography>{errorMessage}</Typography>
          </Box>
        )}
        {venues
          .filter((venue) => {
            if (search === '') {
              return venue
            } else if (
              venue.name.toLowerCase().includes(search.toLowerCase())
            ) {
              return venue
            } else if (
              venue.location.city.toLowerCase().includes(search.toLowerCase())
            ) {
              return venue
            } else if (
              venue.location.address
                .toLowerCase()
                .includes(search.toLowerCase())
            ) {
              return venue
            }
          })
          .map((venue) => {
            return (
              <Grid item xs={12} md={3} key={venue.id}>
                <Link
                  to={`/product/${venue.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Paper variant="secondary" sx={{height:'270px'}}>
                    <Box
                      component={'img'}
                      src={venue.media}
                      sx={{ height: '200px', width: '100%' }}
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
