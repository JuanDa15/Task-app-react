import { Routes, Route, Navigate } from 'react-router-dom'
import JournalPage from '../pages/Journal.page'

export default function JournalRoutes (): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<JournalPage />} />
      <Route path="/*" element={<Navigate to="/" replace={true} />} />
    </Routes>
  )
}
