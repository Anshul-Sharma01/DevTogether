
import { Routes, Route } from 'react-router-dom'

// components imports
import LandingPage from './components/Mains/LandingPage'
import UserFriends from './components/Friends/UserFriends'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage/>}> </Route>
        <Route path='/user/friends'  element={<UserFriends/>}></Route>


      </Routes>
    </>
  )
}

export default App
