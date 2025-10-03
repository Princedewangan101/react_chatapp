import './App.css';
import Homepage from './Pages/Homepage';
import Auth_page from './Pages/Auth_page';
import Profile from './Pages/Profile';
import { Toaster } from 'react-hot-toast';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/Authcontext';

function App() {
  const {authUser} = useContext(AuthContext)
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={authUser ? <Homepage /> : <Navigate to="/auth" />} />
        <Route path="/auth" element={!authUser ?<Auth_page /> : <Navigate to="/" />} />
        <Route path="/profile" element={authUser ?<Profile /> : <Navigate to="/auth" />} />
      </Routes>
    </>

  );
}

export default App;
