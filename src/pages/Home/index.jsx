import { Box, Paper, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2';

function Home() {
  return (
    <Box p="2rem" display={'flex'} flexDirection={'column'}  >
      <Box margin={'0 auto'} pb={'2rem'}>
        <TextField id="outlined-basic" label="Search..." variant="outlined" sx={{ maxWidth:'550px'}} />
      </Box>
    

      <Grid container spacing={2} columns={{ xs: 1, md: 3, lg: 4 }} justifyContent={'center'} alignContent={'center'} height={'100%'}>
        <Grid item >
          <Paper variant='secondary'>
            <img src="/product.png " alt="" />
          </Paper>
        </Grid>
        <Grid item >
          <Paper variant='secondary'>
            <img src="/product.png " alt="" />
          </Paper>
        </Grid>
        <Grid item >
          <Paper variant='secondary'>
            <img src="/product.png " alt="" />
          </Paper>
        </Grid>
        <Grid item>
          <Paper variant='secondary'>
            <img src="/product.png " alt="" />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Home
