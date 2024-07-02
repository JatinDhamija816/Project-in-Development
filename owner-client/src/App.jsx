import React from 'react'
import { OwnerProvider } from './contexts/OwnerContext'
import { Routes, Route } from 'react-router-dom'
import PublicRoute from './Routes/PublicRoute'
import ProtectedRoute from './Routes/ProtectedRoute'
import InitialHome from './components/Initial/InitialHome'
const App = () => {
  return (
    <OwnerProvider>
      <Routes>
        <Route path='/' element={<PublicRoute><InitialHome /></PublicRoute>} />
      </Routes>
    </OwnerProvider>
  )
}

export default App