import { useNavigate } from "react-router-dom";
import React, { useState } from "react"

const NavigateSignUp: React.FC = () => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate("/sign-up")
    }

    return (
    <button onClick={handleClick}>
      Sign-Up Now!
    </button>
  );
}
export default NavigateSignUp;