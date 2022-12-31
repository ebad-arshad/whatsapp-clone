import './Auth.css';
import Nav from '../../components/Nav/Nav';
import { useState } from 'react';
import Login from '../../components/Login-Signup/Login';
import SignUp from '../../components/Login-Signup/SignUp';

const Auth = () => {

    const [togglePage, setTogglePage] = useState(false);

    return (
        <>
            <Nav />
            {togglePage ? <SignUp setToggle={setTogglePage} /> : <Login setToggle={setTogglePage} />}
        </>
    )
}

export default Auth;