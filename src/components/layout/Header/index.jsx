import { AppBar, Typography, Toolbar, Link } from '@mui/material'
import IconButton from '@mui/material/IconButton'

function Header() {
  return (
    <AppBar
      position="static"
      sx={{
        borderRadius: { xs: 0, md: '10px 10px 0 0' },
        backgroundColor: { xs: 'primary.main', md: 'secondary.main' },
        borderBottom: '3px solid',
        borderBottomColor: 'primary.main',
      }}
    >
      <Toolbar
        sx={{
          mt: '1rem',
        }}
      >
        <Link
          href="/"
          underline="none"
          color="textPrimary"
          sx={{ flexGrow: 1 }}
        >
          <IconButton>
            <img src="/logo.png" alt="" width={'150px'} />
          </IconButton>
        </Link>
        <Link href="/login" underline="none" sx={{}}>
          <Typography
            variant="h2"
            sx={{
              flexGrow: 1,
              p: '2rem',
              color: { xs: 'text.secondary', md: 'text.primary' },
            }}
          >
            Login
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  )
}

export default Header
