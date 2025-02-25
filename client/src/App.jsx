
import { Routes, Route } from 'react-router-dom'

// components imports
import LandingPage from './components/Mains/LandingPage'
import UserFriends from './components/Friends/UserFriends'
import AllCollabs from './components/Collabs/AllCollabs'
import NotFound from './components/Misc/NotFound'
import Denied from './components/Misc/Denied'
import SignIn from './components/Auth/SignIn'
import SignUp from './components/Auth/SignUp'
import ForgotPassword from './components/Auth/ForgotPassword'
import DevelopersTeam from './pages/DevelopersTeam'
import Contact from './pages/Contact'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage/>}> </Route>
        <Route path='/user/friends'  element={<UserFriends/>}></Route>
        <Route path='/collabs/all-collabs'  element={<AllCollabs/>}></Route>

        <Route path='/contact' element={<Contact/>}></Route>

        {/* Auth Routes */}
        <Route path='/auth/sign-in' element={<SignIn/>}></Route>
        <Route path='/auth/sign-up' element={<SignUp/>}></Route>
        <Route path='/auth/forgot-password' element={<ForgotPassword/>}></Route>


        {/* Denied Route */}
        <Route path='/denied' element={<Denied/>}></Route>

        {/* Not found route */}
        <Route path='*' element={<NotFound/>}></Route>

      </Routes>
    </>
  )
}

export default App
