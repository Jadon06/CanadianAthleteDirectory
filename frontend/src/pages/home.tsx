import Logo from "../assets/Logo.png"
import NavigateSignUp from "./buttons/signup_utils" 
import NavigateSignIn from "./buttons/signin_utils";

export default function Home() {
    return (
        <div className="center-grid">
            <div>
                <img 
                    src={Logo}
                    alt="Logo"
                    style={{ width: "120px", marginBottom: "16px"}}/>
            <h1>Northern Athletes</h1>
            <h2 style={{fontWeight: 300, fontSize: 18}}>
                Helping Canadian Athletes Make the Big Leagues
                </h2>
            <div className="button-column">
                <NavigateSignUp />
                <NavigateSignIn />
            </div>
            </div>
                <h3 style={{ marginBottom: "0px"}}>About</h3>
                <p style={{marginBottom: "40px"}}>We are an organization that believes in Canadian Talent.
                    Historically there've been many great Canadian talents,
                    shown on the big screen, but there could be so many more.
                    Thousands of Canadian student athletes have their talents
                    ignored and becuase of that don't have a fair chance to 
                    make it pro, which is where we come in. We connect student
                    Canadian athletes with pro scouts, recruiters, coaches, etc
                    giving Canadian student athletes a fair chance to chase their
                    dreams.
                </p>
            </div>
    );
}