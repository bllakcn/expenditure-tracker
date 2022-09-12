import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

import './App.css';

import Navbar from './components/Navbar'

import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'

function App() {
  const { authIsReady, user } = useAuthContext()

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar></Navbar>
          <Routes>
            <Route element={user ? <Home/> : <Login/>} path='/'/>
            <Route element={!user ? <Login/> : <Home/>} path='/login'/>
            <Route element={!user ? <Signup/> : <Home/>} path='/signup'/>
            <Route element={user ? <Home/> : <Login/>} path='/*'/>
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}


export default App; 
