import React from 'react';

import { Route, Routes } from 'react-router-dom';
import Profile from './pages/Profile';
import DetailPage from './pages/DetailPage';
import Signup from './pages/Signup';
import { Toaster } from 'react-hot-toast';
import  Login  from './pages/Login';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Toaster position="top-center" reverseOrder={false}/>
      <Routes>
        <Route path='/' element={<Home/>}  />
        <Route path='/login' element={<Login/>}  />
        <Route path='/signup' element={<Signup/>}  />
        <Route path='/profile' element={<Profile/>}  />
        <Route path='/details/:pId' element={<DetailPage/>}  />
      </Routes>
    </div>
  );
}

export default App;
