import { AppBar, Typography, Toolbar, Link, Box } from '@mui/material'
import IconButton from '@mui/material/IconButton'


function Header() {
  return (
    <Box mt={'2rem'}>
        <AppBar
      position="static"
      sx={{
        backgroundColor: 'secondary.main',
        borderBottom: '3px solid',
        borderColor: 'primary.main',
        width: '100%',
        padding: '2rem 0',
      }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        ></IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          News
        </Typography>
        <Link to="/login" >login</Link>
      </Toolbar>
    </AppBar>
    </Box>
    
  )
}

export default Header
