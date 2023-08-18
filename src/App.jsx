import { Container, Typography } from '@mui/material'
import './App.css'
import { Button } from '@mui/material'
import { height } from '@mui/system'

function App() {
  return (
    <Container
      sx={{
        bgcolor: 'primary.main',
        height: '100vh',
        padding: "0",
      }}
      variant="fluid"
    >
      <Button variant="contained" color="secondary">
        hello
      </Button>
    </Container>
  )
}

export default App
