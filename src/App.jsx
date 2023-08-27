import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout'
import Home from './pages/Home'
import Product from './pages/Product'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/product" element={<Product/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/profile" element={<Profile/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
