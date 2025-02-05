
import { Routes, Route } from 'react-router-dom'

// components imports
import LandingPage from './components/Mains/LandingPage'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage/>}> </Route>
      </Routes>
    </>
  )
}

export default App
