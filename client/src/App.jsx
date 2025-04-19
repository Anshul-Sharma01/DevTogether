import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import RequireAuth from './helpers/RequireAuth';
import Loader from './components/Misc/Loader';



// Lazy-loaded components
const LandingPage = lazy(() => import('./components/Mains/LandingPage'));
const UserFriends = lazy(() => import('./components/Friends/UserFriends'));
const AllCollabs = lazy(() => import('./components/Collabs/AllCollabs'));
const NotFound = lazy(() => import('./components/Misc/NotFound'));
const Denied = lazy(() => import('./components/Misc/Denied'));
const SignUp = lazy(() => import('./components/Auth/SignUp'));
const ForgotPassword = lazy(() => import('./components/Auth/ForgotPassword'));
const DevelopersTeam = lazy(() => import('./pages/DevelopersTeam'));
const Contact = lazy(() => import('./pages/Contact'));
const LogIn = lazy(() => import('./components/Auth/LogIn'));
const ResetPassword = lazy(() => import("./components/Auth/ResetPassword"));



function App() {
  return (
    <Suspense fallback={<Loader/>}>
      <Routes>
        <Route path='/' element={<LandingPage />} />

        <Route element={<RequireAuth />}>
          <Route path='/user/friends' element={<UserFriends />} />
          <Route path='/collabs/all-collabs' element={<AllCollabs />} />
        </Route>

        <Route path='/contact' element={<Contact />} />


        {/* Auth Routes */}
        <Route path='/auth/login' element={<LogIn />} />
        <Route path='/auth/sign-up' element={<SignUp />} />
        <Route path='/auth/forgot-password' element={<ForgotPassword />} />
        <Route path='/auth/reset/:resetToken' element={<ResetPassword/>} ></Route>

        {/* Denied Route */}
        <Route path='/denied' element={<Denied />} />

        {/* Not Found Route */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;



