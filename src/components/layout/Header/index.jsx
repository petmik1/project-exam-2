import { AppBar, Typography, Toolbar, Link, Box } from '@mui/material'
import IconButton from '@mui/material/IconButton'

function Header() {
  return (
    <Box mt={{ padding: 0 }}>
        <AppBar position="static" color="transparent" elevation={0} sx={{borderBottom:'3px solid'}} >
            <Toolbar>
                <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
                    <Link href="/" underline="none" color="textPrimary">
                        <IconButton>
                            <img src="/logo.png" alt="logo" width="50" height="50" />
                        </IconButton>
                    </Link>
                </Typography>
                <Link href="/login" underline="none" color="textPrimary">
                    <Typography variant="body1" sx={{ flexGrow: 1 }}>
                        Login
                    </Typography>
                </Link>
                <Link href="/register" underline="none" color="textPrimary">
                    <Typography variant="body1" sx={{ flexGrow: 1 }}>
                        Register
                    </Typography>
                </Link>
            </Toolbar>
        </AppBar>
    
    </Box>
  )
}

export default Header
