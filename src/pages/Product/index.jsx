import { Box, Grid, List, ListItemText, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import setTitle from '../../components/setTitle'

const tommorow = dayjs().add(1, 'day')
const dayAfterTommorow = dayjs().add(2, 'day')

function Product() {
  setTitle('Product')
  return (
    <Box m={{ xs: '1rem', md: '5rem' }}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={6}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'left'}
        >
          <img
            src="/product.png"
            alt=""
            width={'90%'}
            style={{
              borderRadius: '20px',
              border: '3px solid',
              borderColor: '#00679F',
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display={'flex'} flexDirection={'column'} alignItems={'left'}>
            <Typography variant={'h1'}>Title</Typography>
            <List>
              <ListItemText primary={'price'} />
              <ListItemText primary={'max guests'} />
              <ListItemText primary={'rating'} />
              <ListItemText primary={'location'} />
              <Typography variant="body1" color="initial">
                this is a example of a body text Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Aliquam blandit consectetur odio,
                sed mollis massa laoreet a. Nunc tincidunt est augue, aliquet
                tristique lectus sagittis id. Aenean ut tellus vel sem tristique
                facilisis non ac elit.{' '}
              </Typography>
            </List>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display={'flex'} flexDirection={'column'} alignItems={'left'}>
            <List>
              <ListItemText primary={'WIFI:'} />
              <ListItemText primary={'Parking:'} />
              <ListItemText primary={'Breakfast:'} />
              <ListItemText primary={'Pets:'} />
              <br />
              <ListItemText primary={'location:'} />
              <ListItemText primary={'Address:'} />
              <ListItemText primary={'Zip:'} />
              <ListItemText primary={'City:'} />
              <ListItemText primary={'Country:'} />
              <ListItemText primary={'continent:'} />
            </List>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h2">from</Typography>
            <DatePicker minDate={tommorow} />
            <Typography variant="h2">to</Typography>
            <DatePicker minDate={dayAfterTommorow} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Product
