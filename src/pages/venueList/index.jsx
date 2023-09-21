import { useParams } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import api from '../../data/apiBase'
import { Box, Paper, TableContainer } from '@mui/material'
import dayjs from 'dayjs'
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'

function VenueList() {
  const { id } = useParams()
  const [venue, setVenue] = useState([])
  const [bookings, setBookings] = useState([])

  function createDate(name, dateTo, dateFrom, guests) {
    return {
      id,
      dateTo,
      dateFrom,
      guests,
    }
  }
  const rows = []

  useEffect(() => {
    const fetchVenue = async () => {
      const response = await api.get('/venues/' + id + '/?_bookings=true')
      try {
        setVenue(response.data)
        setBookings(response.data.bookings)
      } catch (error) {
        console.log(error)
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

  console.log(rows)
  return (
    <Box>
      <Typography variant="h1" color="initial" mb={'1rem'}>
       bookings for: {venue.name}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Date to</TableCell>
              <TableCell align='center'>Date from</TableCell>
              <TableCell align='center'>Guests</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell align='center'>{row.dateTo}</TableCell>
                <TableCell align='center'>{row.dateFrom}</TableCell>
                <TableCell align='center'>{row.guests}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default VenueList
