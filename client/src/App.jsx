
import { Routes, Route } from 'react-router-dom'

// components imports
import LandingPage from './components/Mains/LandingPage'
import UserFriends from './components/Friends/UserFriends'
import AllCollabs from './components/Collabs/AllCollabs'
import NotFound from './components/Misc/NotFound'
import Denied from './components/Misc/Denied'
import SignIn from './components/Auth/SignIn'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage/>}> </Route>
        <Route path='/user/friends'  element={<UserFriends/>}></Route>
        <Route path='/collabs/all-collabs'  element={<AllCollabs/>}></Route>

        {/* Auth Routes */}
        <Route path='/auth/sign-in' element={<SignIn/>}></Route>


        {/* Denied Route */}
        <Route path='/denied' element={<Denied/>}></Route>

        {/* Not found route */}
        <Route path='*' element={<NotFound/>}></Route>

      </Routes>
    </>
  )
}

export default App
