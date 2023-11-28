import { Routes, Route, Navigate } from 'react-router-dom'
import RegisterPage from '../pages/Register.page'
import LoginPage from '../pages/Login.page'

export default function AuthRoutes (): JSX.Element {
  return (
    <Routes>
      <Route path='login' element={ <LoginPage /> } />
      <Route path='register' element={ <RegisterPage /> } />
      <Route path='*' element={ <Navigate to="/auth/login" replace={true} /> } />
    </Routes>
  )
}
