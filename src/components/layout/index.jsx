import { Container } from '@mui/material'
import Header from './Header'
import { Outlet } from 'react-router-dom'
// import { Container } from "@mui/material"

function Layout() {
  return (
    <Container>
      <Header />
      <Outlet />
    </Container>
  )
}

export default Layout
