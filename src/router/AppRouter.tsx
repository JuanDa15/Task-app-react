import { Routes, Route } from 'react-router-dom'
import AuthRoutes from '../auth/routes/AuthRoutes'
import JournalRoutes from '../journal/routes/JournalRoutes'

export default function AppRouter (): JSX.Element {
  return (
    <Routes>
      {/* Login, Register */}
      <Route path='/auth/*' element={ <AuthRoutes /> }/>

      {/* Journal */}
      <Route path='/*' element={ <JournalRoutes /> }/>
    </Routes>
  )
}
