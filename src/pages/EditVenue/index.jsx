import {
    Typography,
    Box,
    TextField,
    Button,
    FormControlLabel,
    Switch,
    Grid,
  } from '@mui/material'
  import { useForm } from 'react-hook-form'
  
  function EditVenue() {
    const form = useForm({
      defaultValues: {
        name: '',
        media: '',
        max_guests: '',
        rating: '',
        price: '',
        description: '',
        wifi: '',
        parking: '',
        breakfast: '',
        pets: '',
        address: '',
        city: '',
        zip: '',
        country: '',
        continent: '',
        longitude: '',
        latitude: '',
      },
    })
  
    const { register, handleSubmit } = form
  
    const onsubmit = (data) => {
      console.log(data)
    }
  
    return (
      <Box>
        <Typography variant="h1" textAlign={'center'}>
          Edit venue
        </Typography>
  
        
        <Box maxWidth={'800px'} margin={'1rem auto'}><Typography variant="h2" textAlign={'left'}  >
          General
        </Typography></Box>
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Box
            component="form"
            onSubmit={handleSubmit(onsubmit)}
            display={'flex'}
            flexDirection={'column'}
            maxWidth={'800px'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Grid container spacing={2} justifyContent={'center'}>
              <Grid item xs={12} md={6}>
                <TextField
                  sx={{ width: '100%' }}
                  label="name"
                  type="text"
                  {...register('name')}
                ></TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  sx={{ width: '100%' }}
                  label="media"
                  type="text"
                  {...register('media')}
                ></TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  sx={{ width: '100%' }}
                  label="max_guests"
                  type="text"
                  {...register('max_guests')}
                ></TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  sx={{ width: '100%' }}
                  label="rating"
                  type="text"
                  {...register('rating')}
                ></TextField>
              </Grid>
              <Grid
                item
                xs={12}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <TextField
                  sx={{ width: '50%' }}
                  label="price"
                  type="text"
                  {...register('price')}
                ></TextField>
              </Grid>
              <Grid
                item
                xs={12}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <TextField
                  sx={{ width: '50%' }}
                  label="description"
                  type="text"
                  {...register('description')}
                ></TextField>
              </Grid>
              <Grid
                item
                xs={12}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                flexDirection={'column'}
              >
                <FormControlLabel
                  {...register('wifi')}
                  control={<Switch />}
                  label="Wifi"
                />
                <FormControlLabel
                  {...register('parking')}
                  control={<Switch />}
                  label="Parking"
                />
  
                <FormControlLabel
                  {...register('breakfast')}
                  control={<Switch />}
                  label="Breakfast"
                />
                <FormControlLabel
                  {...register('pets')}
                  control={<Switch />}
                  label="Pets"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  sx={{ width: '100%' }}
                  label="address"
                  type="text"
                  {...register('address')}
                ></TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  sx={{ width: '100%' }}
                  label="city"
                  type="text"
                  {...register('city')}
                ></TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  sx={{ width: '100%' }}
                  label="zip"
                  type="text"
                  {...register('zip')}
                ></TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  sx={{ width: '100%' }}
                  label="country"
                  type="text"
                  {...register('country')}
                ></TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  sx={{ width: '100%' }}
                  label="continent"
                  type="text"
                  {...register('continent')}
                ></TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  sx={{ width: '100%' }}
                  label="longitude"
                  type="text"
                  {...register('longitude')}
                ></TextField>
              </Grid>
              <Grid
                item
                xs={12}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <TextField
                  sx={{ width: '50%' }}
                  label="latitude"
                  type="text"
                  {...register('latitude')}
                ></TextField>
              </Grid>
            </Grid>
  
            <Button type="submit" variant="contained" sx={{ marginTop: '1rem' }}>
              Edit
            </Button>
          </Box>
        </Box>
      </Box>
    )
  }
  
  export default EditVenue
  