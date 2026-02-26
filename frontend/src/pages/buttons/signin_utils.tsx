import { useNavigate } from "react-router-dom";
import React from "react"

const NavigateSignIn: React.FC = () => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate("/sign-in")
    }

    return (
    <button onClick={handleClick}>
      Sign in
    </button>
  );
}
export default NavigateSignIn;