import React, { useState } from 'react'   // ⬅️ changed (added useState)
import Signupcomponent from '../components/Signupcomponent';
import bg from "../assets/bg.jpg";
import Logincomponent from '../components/Logincomponent';

const Auth_page = () => {
  const [mode, setMode] = useState("signup"); // ⬅️ changed (state to toggle forms)

  return (
    <div
      className="w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="w-full h-screen flex justify-center items-center backdrop-blur-sm">
        {mode === "signup" ? (   // ⬅️ changed
          <Signupcomponent switchToLogin={() => setMode("login")} />   // ⬅️ changed
        ) : (
          <Logincomponent switchToSignup={() => setMode("signup")} />   // ⬅️ changed
        )}
      </div>
    </div>
  )
}

export default Auth_page


