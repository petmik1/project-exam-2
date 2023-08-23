import { AppBar, Typography, Toolbar, Link, Box } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import { useState } from 'react'


function Header() {
  const [navBarOpen, setNavBarOpen] = useState(false)

  function hamburgerMenu() {
    setNavBarOpen((prev) => !prev)
  }

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
          display: 'flex',
          justifyContent: 'space-between',
          mt: '1rem',
        }}
      >
        <Link href="/" underline="none" color="textPrimary">
          <img src="/logo.png" alt="" width="100px" />
        </Link>
        <MenuIcon fontSize='large' onClick={hamburgerMenu} sx={{ display: { md: 'none' } }} />
        <Link
          href="/login"
          underline="none"
          sx={{ display: { xs: 'none', md: 'block' } }}
        >
          <Box display={'flex'} alignItems={'center'}>
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
            <PermIdentityIcon sx={{ color: 'text.primary' }} />
          </Box>
        </Link>
      </Toolbar>

      <Box sx={{ display: { xs: navBarOpen ? 'block' : 'none', md: 'none' } }}>
        <Link
          href="/login"
          underline="none"
          sx={{
            display: { xs: 'flex', md: 'none' },
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h2"
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'text.secondary',
            }}
          >
            Login
          </Typography>
          <PermIdentityIcon sx={{ color: 'text.secondary' }} />
        </Link>
      </Box>
    </AppBar>
  )
}

export default Header
