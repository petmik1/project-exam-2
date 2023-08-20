import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<h1>home</h1>}/>
          <Route path="/login" element={<h1>login</h1>}/>

        </Route>

      </Routes>
    </>
  )
}

export default App
