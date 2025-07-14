import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Login from "./pages/Login";

function App() {


  return (
    <div>
      <Routes>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
