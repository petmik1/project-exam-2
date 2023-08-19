import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout'

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Layout/>}>
          
        </Route>
      </Routes>
    </>
  )
}

export default App
