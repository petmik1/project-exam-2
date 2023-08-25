import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout'
import Home from './pages/Home'
import Product from './pages/Product'
import Login from './pages/Login'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/product" element={<Product/>} />
          <Route path="/login" element={<Login/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
