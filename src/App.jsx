import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout'
import Home from './pages/Home'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<h1>login</h1>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
