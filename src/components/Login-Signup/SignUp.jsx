import React, { useRef, useState } from 'react'
import '../../container/Auth/Auth.css';
import { Modal, Spin } from 'antd';
import { auth, db, createUserWithEmailAndPassword, doc, setDoc } from '../../Firebase/Firebase';
import { useDispatch } from 'react-redux';

const SignUp = ({ setToggle }) => {

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const [togglingSpinner, setTogglingSpinner] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState(92);

    const dispatch = useDispatch();

    const signUpBtn = () => {
        nameRef.current.value = nameRef.current.value.trim();
        if (nameRef.current.value.trim().includes('  ')) {
            Modal.error({
                title: 'Name is incorrect',
                content: 'Please write correct name.',
            });
        }
        else if (phoneNumber.length !== 12) {
            Modal.error({
                title: 'Phone number is incorrect',
                content: 'Please write correct phone number.',
            });
        }
        else if (!emailRef.current.value.match(emailRegex)) {
            Modal.error({
                title: 'Email is incorrect',
                content: 'Please write correct email address.',
            });
        }
        else if (!passwordRef.current.value.match(passwordRegex)) {
            Modal.error({
                title: 'Password is incorrect',
                content: 'Please write correct password.',
            });
        }
        else {
            setTogglingSpinner(true);
            createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
                .then(async (userCredential) => {
                    const userData = JSON.stringify(userCredential.user);
                    await setDoc(doc(db, "users", userCredential.user.uid), {
                        name: nameRef.current.value,
                        email: emailRef.current.value,
                        password: passwordRef.current.value,
                        phoneNumber: `+${phoneNumber}`,
                    });
                    dispatch({ type: 'SIGNEDIN', userData })
                })
                .catch((error) => {
                    setTogglingSpinner(false);
                    if (error.code === 'auth/email-already-in-use') {
                        Modal.error({
                            title: 'Email already taken',
                            content: 'Email has already been taken please try another one.',
                        });
                    }
                    else {
                        Modal.error({
                            title: 'Something is incorrect',
                            content: 'Please check everything and try again.',
                        });
                    }
                });
        }
    }

    const gettingPhoneNumber = event => event.target.value.length <= 2 ?
        setPhoneNumber(92) :
        event.target.value.length === 13 ?
            null :
            setPhoneNumber(event.target.value);


    return (
        <div className='container'>
            <div className="heading">Sign Up to Whatsapp</div>
            <div className='signUpInputs'>
                <div className="signUpInput signUpPassword">
                    <input ref={nameRef} type="text" placeholder='User name' />
                </div>
                <div className="signUpInput signUpPhoneNumber">
                    <input value={phoneNumber} onChange={gettingPhoneNumber} min='9' max='10' type="number" placeholder='Phone number' />
                </div>
                <div className="signUpInput signUpEmail">
                    <input ref={emailRef} type="text" placeholder='Email address' />
                </div>
                <div className="signUpInput signUpPassword">
                    <input ref={passwordRef} type="password" placeholder='Password' />
                </div>
            </div>
            <div className="signUpButton"><button onClick={signUpBtn}>Sign up</button></div>
            <hr className='lineBreak' />
            <div className="createButton"><button onClick={() => setToggle(false)}>Login Instead</button></div>
            {togglingSpinner && <div className="spinner"><Spin /></div >}
        </div>
    )
}

export default SignUp