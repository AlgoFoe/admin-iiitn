import { Navigate, Route, Routes } from 'react-router-dom'
import Faculty from './pages/Faculty'
import Login from './pages/Login'
import { Toaster } from 'react-hot-toast'
import Project from './pages/Project'
import CustomNavbar from './components/Navbar'
import Signup from './pages/SignUp'
import useAuthContext from './hooks/useAuthContext'
import '@/css/App.css'

function App() {

  const { authUser } = useAuthContext()

  return (
    <div
      className='w-screen'
    >
      <CustomNavbar />
      <Toaster />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={authUser ? <Navigate to="/faculty" /> : <Login />} />
        <Route path="/signup" element={authUser ? <Navigate to="/faculty" /> : <Signup />} />
        <Route path="/faculty" element={authUser ? <Faculty /> : <Navigate to="/login" />} />
        <Route path="/project" element={authUser ? <Project /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  )
}

export default App
