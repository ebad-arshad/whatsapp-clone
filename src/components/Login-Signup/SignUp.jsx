import React, { useRef } from 'react'
import '../../container/Auth/Auth.css';
import { Modal } from 'antd';
import { auth, createUserWithEmailAndPassword, } from '../../Firebase/Firebase';
import { useDispatch } from 'react-redux';

const SignUp = ({ setToggle }) => {

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    const emailRef = useRef();
    const passwordRef = useRef();

    const dispatch = useDispatch();

    const signUpBtn = () => {
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
            console.log('submitted');
            createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
                .then((userCredential) => {
                    const userData = JSON.stringify(userCredential.user);
                    dispatch({ type: 'SIGNEDIN', userData })
                })
                .catch((error) => {
                    console.log('Error ==>', error.message)
                });
        }
    }

    return (
        <div className='container'>
            <div className="heading">Sign Up to Whatsapp</div>
            <div className='loginInputs'>
                <div className="loginInput loginEmail">
                    <input ref={emailRef} type="text" placeholder='Email address or phone number' />
                </div>
                <div className="loginInput loginPassword">
                    <input ref={passwordRef} type="password" placeholder='Password' />
                </div>
            </div>
            <div className="loginButton"><button onClick={signUpBtn}>Sign up</button></div>
            <hr className='lineBreak' />
            <div className="createButton"><button onClick={() => setToggle(false)}>Login Instead</button></div>
        </div>
    )
}

export default SignUp