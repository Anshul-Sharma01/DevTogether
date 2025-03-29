
import { Routes, Route } from 'react-router-dom'

// components imports
import LandingPage from './components/Mains/LandingPage'
import UserFriends from './components/Friends/UserFriends'
import AllCollabs from './components/Collabs/AllCollabs'
import NotFound from './components/Misc/NotFound'
import Denied from './components/Misc/Denied'
import SignUp from './components/Auth/SignUp'
import ForgotPassword from './components/Auth/ForgotPassword'
import DevelopersTeam from './pages/DevelopersTeam'
import Contact from './pages/Contact'
import LogIn from './components/Auth/LogIn'
import RequireAuth from './helpers/RequireAuth'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage/>}> </Route>

        <Route element={<RequireAuth/>}>
          <Route path='/user/friends'  element={<UserFriends/>}></Route>
          <Route path='/collabs/all-collabs'  element={<AllCollabs/>}></Route>
        </Route>

        <Route path='/contact' element={<Contact/>}></Route>

        {/* Auth Routes */}
        <Route path='/auth/log-in' element={<LogIn/>}></Route>
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
