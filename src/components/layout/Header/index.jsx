import { AppBar, Typography, Toolbar, Link, Box } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import { useState } from 'react'
import storage from '../../../storage'
import { NavLink } from 'react-router-dom'
import './styles.css'


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
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          mt: '1rem',
        }}
      >
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          width={'100%'}
        >
          <Link href="/" underline="none" color="textPrimary">
            <img src="/logo.png" alt="" width="100px" />
          </Link>
          <MenuIcon
            fontSize="large"
            onClick={hamburgerMenu}
            sx={{ display: { md: 'none' } }}
          />
        </Box>
        <Box
          display={{ xs: navBarOpen ? 'flex' : 'none', md: 'flex' }}
          flexDirection={{xs:'column', md:'row'}}
          alignItems={'center'}
          justifyContent={'center'}
          width={'100%'}
        >
          <Box component={NavLink} display={!user ? 'block' : 'none' }  p={'0 1rem'} to="/login">
            <Typography color={{xs:'text.secondary', md:'text.primary'}}>login</Typography>
          </Box>
          <Box component={NavLink} display={user ? 'block' : 'none' } p={'0 1rem'} to="/createVenue">
            <Typography color={{xs:'text.secondary', md:'text.primary'}}>create venue</Typography>
          </Box>
          <Box component={NavLink} display={user ? 'flex' : 'none' } p={'0 1rem'} justifyContent={'center'} alignItems={'center'} to="/profile">
            <Typography color={{xs:'text.secondary', md:'text.primary'}}>profile</Typography>
            <PermIdentityIcon sx={{color:{xs:'common.white', md:'common.black'}}} />
          </Box>
          <Box component={NavLink} sx={{textDecoration:'none'}} display={user ? 'block' : 'none' } p={'0 1rem'} onClick={Logout}>
            <Typography textAlign={'center'} color={{xs:'text.secondary', md:'text.primary'}}>logout</Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
