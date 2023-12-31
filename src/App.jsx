import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout'
import Home from './pages/Home'
import Product from './pages/Product'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import CreateVenue from './pages/CreateVenue'
import EditVenue from './pages/EditVenue'
import VenueList from './pages/venueList'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/product/:id" element={<Product/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/createVenue" element={<CreateVenue/>} />
          <Route path="/editVenue/:id" element={<EditVenue/>} />
          <Route path="/venueList/:id" element={<VenueList/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
