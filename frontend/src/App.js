import React, { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Login from './page/Login'
import Registration from './page/Registration'
import Dashboard from './page/Dashboard';
import Joinroom from './page/Joinroom';
import Createroom from './page/Createroom';
import Room from './page/Room';

const App = () => {
  const [userLogged, setUserLogged] = useState(null);
  const [roomLogged, setRoomLogged] = useState(null);

  return (
    <div>
      <Routes>
        <Route key="Login" path="/" element={<Login userLogged={userLogged} setUserLogged={setUserLogged} />} />
        <Route key="register" path="/register" element={<Registration />} />
        <Route key="Login" path="/login" element={<Login userLogged={userLogged} setUserLogged={setUserLogged}/>} />
        <Route key="dashboard" path="/dashboard" element={<Dashboard userLogged={userLogged} setUserLogged={setUserLogged}/>} />
        <Route key="Joinroom" path="/joinroom" element={<Joinroom userLogged={userLogged} setUserLogged={setUserLogged} roomLogged={roomLogged} setRoomLogged={setRoomLogged}/>} />
        <Route key="Createroom" path="/Createroom" element={<Createroom userLogged={userLogged} setUserLogged={setUserLogged}/>} />
        <Route key="Room" path="/room" element={<Room userLogged={userLogged} setUserLogged={setUserLogged} roomLogged={roomLogged} setRoomLogged={setRoomLogged}/>} />
      </Routes>
    </div>
  )
}

export default App