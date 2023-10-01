import { useParams } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import api from '../../data/apiBase'
import {
  Box,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Alert,
  AlertTitle,
  CircularProgress,
} from '@mui/material'
import dayjs from 'dayjs'
import {} from '@mui/material'

function VenueList() {
  const { id } = useParams()
  const [venue, setVenue] = useState([])
  const [bookings, setBookings] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  function createDate(name, dateTo, dateFrom, guests) {
    return {
      id,
      dateFrom,
      dateTo,
      guests,
    }
  }
  const rows = []

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        setLoading(true)
        const response = await api.get('/venues/' + id + '/?_bookings=true')
        setVenue(response.data)
        setBookings(response.data.bookings)
      } catch (error) {
        setErrorMessage(error.toJSON().message)
      } finally {
        setLoading(false)
      }
    }
    fetchVenue()
  }, [id])

  bookings.map((booking) => {
    console.log(booking)
    rows.push(
      createDate(
        booking.id,
        dayjs(booking.dateTo).format('DD.MM.YY'),
        dayjs(booking.dateFrom).format('DD.MM.YY'),
        booking.guests
      )
    )
  })

  return (
    <Box>
      <Typography variant="h1" color="initial" mb={'1rem'} maxWidth={'800px'} m={'1rem auto'}>
        bookings for: {venue.name}
      </Typography>
      <Box maxWidth={'800px'} margin={'1rem auto'}>
        <Alert
          severity="error"
          sx={{ display: errorMessage ? 'flex' : 'none' }}
        >
          <AlertTitle sx={{ fontWeight: 'bold' }}>Fetch bookings error</AlertTitle>
          {errorMessage}
        </Alert>
      </Box>

      <CircularProgress
        sx={{ display: loading ? 'block' : 'none', margin: '0 auto' }}
      ></CircularProgress>
      <TableContainer component={Paper} sx={{maxWidth:'800px', m:'0 auto'}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Date from</TableCell>
              <TableCell align="center">Date to</TableCell>
              <TableCell align="center">Guests</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 && ( // if no bookings
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No bookings
                </TableCell>
              </TableRow>
            )}
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="center">{row.dateFrom}</TableCell>
                <TableCell align="center">{row.dateTo}</TableCell>
                <TableCell align="center">{row.guests}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default VenueList
