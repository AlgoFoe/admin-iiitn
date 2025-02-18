import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
// import { Navbar } from './components/Navbar'
import Faculty from './pages/Faculty'
import '@/css/App.css'
import Home from './pages/Home'
import { useState } from 'react'

function ProtectedLayout({ isAuthorized }) {
  return isAuthorized ? <Outlet /> : <Navigate to="/" />;
}

function App() {

  const [isAuthorized, setIsAuthorized] = useState(false)

  return (
    <div
      className='w-screen'
    >
      <Routes>
        <Route path="/" element={<Home setIsAuthorized={setIsAuthorized} />} />
        
        {/* Protected Routes Grouped Under a Single Layout */}
        <Route element={<ProtectedLayout isAuthorized={isAuthorized} />}>

          <Route path="/faculty" element={<Faculty />} />

        </Route>
      </Routes>
    </div>
  )
}

export default App
