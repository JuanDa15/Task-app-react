import { Routes, Route, Navigate } from 'react-router-dom'
import AuthRoutes from '../auth/routes/AuthRoutes'
import JournalRoutes from '../journal/routes/JournalRoutes'
import CheckingAuth from '../ui/components/CheckingAuth'
import useAuthentication from '../hooks/useAuthentication'

export default function AppRouter (): JSX.Element {
  const status = useAuthentication()

  if (status === 'checking') {
    return <CheckingAuth />
  }
  return (
    <Routes>
      {
        (status === 'authenticated')
          ? <Route path='/*' element={ <JournalRoutes /> }/>
          : <Route path='/auth/*' element={ <AuthRoutes /> }/>
      }
      <Route path='/*' element={ <Navigate to='/auth/login' />}/>
    </Routes>
  )
}
