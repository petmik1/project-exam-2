import { Box, Paper, TextField, Typography, Link } from '@mui/material'
import Grid from '@mui/material/Grid'

function Home() {
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
        columns={{ xs: 1, md: 3, lg: 4 }}
        justifyContent={'center'}
        alignContent={'center'}
        height={'100%'}
      >
        <Grid item>
          <Link href="/product" underline="none">
            <Paper variant="secondary">
              <img src="/product.png " alt="" /> 
              <Box
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
              >
                <Typography variant="h2" color="">
                  title
                </Typography>
                <Typography variant="h2" color="">
                  Where
                </Typography>
              </Box>
            </Paper>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/product" underline="none">
            <Paper variant="secondary">
              <img src="/product.png " alt="" />
              <Box
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
              >
                <Typography variant="h2" color="">
                  title
                </Typography>
                <Typography variant="h2" color="">
                  Where
                </Typography>
              </Box>
            </Paper>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/product" underline="none">
            <Paper variant="secondary">
              <img src="/product.png " alt="" />
              <Box
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
              >
                <Typography variant="h2" color="">
                  title
                </Typography>
                <Typography variant="h2" color="">
                  Where
                </Typography>
              </Box>
            </Paper>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/product" underline="none">
            <Paper variant="secondary">
              <img src="/product.png " alt="" />
              <Box
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
              >
                <Typography variant="h2" color="">
                  title
                </Typography>
                <Typography variant="h2" color="">
                  Where
                </Typography>
              </Box>
            </Paper>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/product" underline="none">
            <Paper variant="secondary">
              <img src="/product.png " alt="" />
              <Box
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
              >
                <Typography variant="h2" color="">
                  title
                </Typography>
                <Typography variant="h2" color="">
                  Where
                </Typography>
              </Box>
            </Paper>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/product" underline="none">
            <Paper variant="secondary">
              <img src="/product.png " alt="" />
              <Box
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
              >
                <Typography variant="h2" color="">
                  title
                </Typography>
                <Typography variant="h2" color="">
                  Where
                </Typography>
              </Box>
            </Paper>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/product" underline="none">
            <Paper variant="secondary">
              <img src="/product.png " alt="" />
              <Box
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
              >
                <Typography variant="h2" color="">
                  title
                </Typography>
                <Typography variant="h2" color="">
                  Where
                </Typography>
              </Box>
            </Paper>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/product" underline="none">
            <Paper variant="secondary">
              <img src="/product.png " alt="" />
              <Box
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
              >
                <Typography variant="h2" color="">
                  title
                </Typography>
                <Typography variant="h2" color="">
                  Where
                </Typography>
              </Box>
            </Paper>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/product" underline="none">
            <Paper variant="secondary">
              <img src="/product.png " alt="" />
              <Box
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
              >
                <Typography variant="h2" color="">
                  title
                </Typography>
                <Typography variant="h2" color="">
                  Where
                </Typography>
              </Box>
            </Paper>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/product" underline="none">
            <Paper variant="secondary">
              <img src="/product.png " alt="" />
              <Box
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
              >
                <Typography variant="h2" color="">
                  title
                </Typography>
                <Typography variant="h2" color="">
                  Where
                </Typography>
              </Box>
            </Paper>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/product" underline="none">
            <Paper variant="secondary">
              <img src="/product.png " alt="" />
              <Box
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
              >
                <Typography variant="h2" color="">
                  title
                </Typography>
                <Typography variant="h2" color="">
                  Where
                </Typography>
              </Box>
            </Paper>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/product" underline="none">
            <Paper variant="secondary">
              <img src="/product.png " alt="" />
              <Box
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
              >
                <Typography variant="h2" color="">
                  title
                </Typography>
                <Typography variant="h2" color="">
                  Where
                </Typography>
              </Box>
            </Paper>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/product" underline="none">
            <Paper variant="secondary">
              <img src="/product.png " alt="" />
              <Box
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
              >
                <Typography variant="h2" color="">
                  title
                </Typography>
                <Typography variant="h2" color="">
                  Where
                </Typography>
              </Box>
            </Paper>
          </Link>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Home
