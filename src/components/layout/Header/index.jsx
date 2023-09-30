import { AppBar, Typography, Toolbar, Link, Box } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import { useState } from 'react'
import storage from '../../../storage'
import { NavLink } from 'react-router-dom'

function Header() {
  const [navBarOpen, setNavBarOpen] = useState(false)
  const [user, setUser] = useState(storage.load('user'))

  function hamburgerMenu() {
    setNavBarOpen((prev) => !prev)
  }
  function Logout() {
    storage.remove('user')
    setUser(null)
    location.href = '/'
  }

  if (storage.user) {
    setUser(storage.user)
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
        <MenuIcon
          fontSize="large"
          onClick={hamburgerMenu}
          sx={{ display: { md: 'none' } }}
        />

        <Box display={!user ? { xs: 'none', md: 'block' } : 'none'}>
          <Box
            component={NavLink}
            to="/login"
            style={({ isActive }) => {
              return {
                textDecoration: isActive ? 'underline' : 'none',
                textDecorationColor: '#101010',
              }
            }}
          >
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
          </Box>
        </Box>
        <Box display={user ? { xs: 'none', md: 'flex' } : 'none'}>
          <Box
            component={NavLink}
            to="/booking"
            style={({ isActive }) => {
              return {
                textDecoration: isActive ? 'underline' : 'none',
                textDecorationColor: '#101010',
              }
            }}
          >
            <Typography
              variant="h2"
              sx={{
                flexGrow: 1,
                p: '2rem',
                color: { xs: 'text.secondary', md: 'text.primary' },
              }}
            >
              booking
            </Typography>
          </Box>
          <Box
            component={NavLink}
            to="/createVenue"
            style={({ isActive }) => {
              return {
                textDecoration: isActive ? 'underline' : 'none',
                textDecorationColor: '#101010',
              }
            }}
          >
            <Typography
              variant="h2"
              sx={{
                flexGrow: 1,
                p: '2rem',
                color: { xs: 'text.secondary', md: 'text.primary' },
              }}
            >
              create venue
            </Typography>
          </Box>
          <Box
            component={NavLink}
            onClick={Logout}
            sx={{ textDecoration: 'none' }}
          >
            <Typography
              variant="h2"
              sx={{
                flexGrow: 1,
                p: '2rem',
                color: { xs: 'text.secondary', md: 'text.primary' },
              }}
            >
              logout
            </Typography>
          </Box>
          <Box
            component={NavLink}
            to="/profile"
            style={({ isActive }) => {
              return {
                textDecoration: isActive ? 'underline' : 'none',
                textDecorationColor: '#101010',
              }
            }}
          >
            <Typography
              variant="h2"
              display={'flex'}
              alignItems={'center'}
              sx={{
                flexGrow: 1,
                p: '2rem',
                color: { xs: 'text.secondary', md: 'text.primary' },
              }}
            >
              profile
              <PermIdentityIcon sx={{ color: 'text.primary' }} />
            </Typography>
          </Box>
        </Box>
      </Toolbar>

      <Box
        sx={{
          display: !user
            ? { xs: navBarOpen ? 'block' : 'none', md: 'none' }
            : 'none',
        }}
      >
        <Box
          component={NavLink}
          to="/login"
          style={({ isActive }) => {
            return {
              textDecoration: isActive ? 'underline' : 'none',
              textDecorationColor: '#ffffff',
            }
          }}
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
              textDecorationColor: '#ffffff',
            }}
          >
            Login
          </Typography>
          <PermIdentityIcon sx={{ color: 'text.secondary' }} />
        </Box>
      </Box>
      <Box
        sx={{
          display: user
            ? { xs: navBarOpen ? 'flex' : 'none', md: 'none' }
            : 'none',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: '1rem',
        }}
      >
        <Box
          component={NavLink}
          to="/booking"
          style={({ isActive }) => {
            return {
              textDecoration: isActive ? 'underline' : 'none',
              textDecorationColor: '#ffffff',
            }
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
            booking
          </Typography>
        </Box>
        <Box
          component={NavLink}
          to="/createVenue"
          style={({ isActive }) => {
            return {
              textDecoration: isActive ? 'underline' : 'none',
              textDecorationColor: '#ffffff',
            }
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
            create venue
          </Typography>
        </Box>
        <Box
          component={NavLink}
          onClick={Logout}
          sx={{ textDecoration: 'none' }}
        >
          <Typography
            variant="h2"
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'text.secondary',
            }}
          >
            logout
          </Typography>
        </Box>
        <Box
          component={NavLink}
          to="/profile"
          style={({ isActive }) => {
            return {
              textDecoration: isActive ? 'underline' : 'none',
              textDecorationColor: '#ffffff',
            }
          }}
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
            profile
          </Typography>
          <PermIdentityIcon sx={{ color: 'text.secondary' }} />
        </Box>
      </Box>
    </AppBar>
  )
}

export default Header
