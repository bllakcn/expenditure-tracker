import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css';

import Navbar from './components/Navbar'

import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route element={<Home/>} path='/'/>
          <Route element={<Login/>} path='/login'/>
          <Route element={<Signup/>} path='/signup'/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
