import React, { useRef, useState } from 'react'
import '../../container/Auth/Auth.css';
import { Modal } from 'antd';
import { auth, signInWithEmailAndPassword } from '../../Firebase/Firebase';
import { useDispatch } from "react-redux";
import ModalResetPass from '../ModalResetPass/ModalResetPass';

const Login = ({ setToggle }) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    const emailRef = useRef();
    const passwordRef = useRef();
    const [togglingModal, setTogglingModal] = useState(false);

    const dispatch = useDispatch();

    const loginBtn = () => {
        if (!emailRef.current.value.match(emailRegex)) {
            Modal.error({
                title: 'Email not found',
                content: 'Please write correct email address.',
            });
        }
        else if (!passwordRef.current.value.match(passwordRegex)) {
            Modal.error({
                title: 'Password is incorrect',
                content: 'Password didn`t match.',
            });
        }
        else {
            signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
                .then((userCredential) => {
                    const userData = JSON.stringify(userCredential.user);
                    dispatch({ type: 'SIGNEDIN', userData })
                })
                .catch((error) => { });
        }
    }

    const showModal = (e) => {
        !e ? setTogglingModal(false) : setTogglingModal(true);
    };

    return (
        <div className='container'>
            <div className="heading">Login to Whatsapp</div>
            <div className='loginInputs'>
                <div className="loginInput loginEmail">
                    <input ref={emailRef} type="text" placeholder='Email address or phone number' />
                </div>
                <div className="loginInput loginPassword">
                    <input ref={passwordRef} type="password" placeholder='Password' />
                </div>
            </div>
            <div className="loginButton"><button onClick={loginBtn}>Log in</button></div>
            <p className='resetPassword' onClick={() => setTogglingModal(true)}>Forgotten password?</p>
            <hr className='lineBreak' />
            <div className="createButton"><button onClick={() => setToggle(true)}>Create New Account</button></div>
            <ModalResetPass togglingModal={togglingModal} showModal={showModal} />
        </div>
    )
}

export default Login