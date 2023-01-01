import React, { useRef, useState } from 'react'
import '../../container/Auth/Auth.css';
import { Modal, Spin } from 'antd';
import { auth, db, createUserWithEmailAndPassword, storage, ref, uploadBytesResumable, getDownloadURL, doc, setDoc } from '../../Firebase/Firebase';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SignUp = ({ setToggle }) => {

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const imageRef = useRef();
    const [togglingSpinner, setTogglingSpinner] = useState(false);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const signUpBtn = () => {
        const imageType = ['image/jpeg', 'image/jpg', 'image/png'];
        nameRef.current.value = nameRef.current.value.trim();
        if (nameRef.current.value.trim().includes('  ')) {
            Modal.error({
                title: 'Name',
                content: 'Please write correct name.',
            });
            return;
        }
        else if (!emailRef.current.value.match(emailRegex)) {
            Modal.error({
                title: 'Email is incorrect',
                content: 'Please write correct email address.',
            });
            return;
        }
        else if (!passwordRef.current.value.match(passwordRegex)) {
            Modal.error({
                title: 'Password is incorrect',
                content: 'Please write correct password.',
            });
            return;
        }
        else if (imageRef.current.files.length === 0) {
            Modal.error({
                title: 'Image not found',
                content: 'Please select an image.',
            });
            return;
        }
        else if (!imageType.includes(imageRef.current.files[0].type)) {
            Modal.error({
                title: 'Image type is not acceptable',
                content: 'The type must be .jpg, .jpeg or .png',
            });
            return;
        }
        else if (imageRef.current.files[0].size / (1024 * 1024) > 1) {
            Modal.error({
                title: 'Image size is greater then 1MB',
                content: 'Please upload image less than 1MB.',
            });
            return;
        }
        else {
            setTogglingSpinner(true);
            const imageFile = imageRef.current.files[0];
            createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
                .then(async (userCredential) => {
                    const userData = JSON.stringify(userCredential.user);
                    const imageURL = await gettingURL(imageFile, userCredential.user.uid);
                    await setDoc(doc(db, "users", userCredential.user.uid), {
                        name: nameRef.current.value,
                        email: emailRef.current.value,
                        password: passwordRef.current.value,
                        imageURL: imageURL,
                    });
                    dispatch({ type: 'SIGNEDUP', userData })
                    navigate('/');
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

    return (
        <div className='container'>
            <div className="heading">Sign Up to Whatsapp</div>
            <div className='signUpInputs'>
                <div className="signUpInput signUpPassword">
                    <input ref={nameRef} type="text" placeholder='User name' />
                </div>
                <div className="signUpInput signUpEmail">
                    <input ref={emailRef} type="text" placeholder='Email address or phone number' />
                </div>
                <div className="signUpInput signUpPassword">
                    <input ref={passwordRef} type="password" placeholder='Password' />
                </div>
                <div className="signUpInput uploadFile">
                    <label htmlFor="uploadImage"><p>Upload image</p></label>
                    <input accept='image/png,image/jpeg,image/jpg' id='uploadImage' ref={imageRef} type="file" />
                </div>
            </div>
            <div className="signUpButton"><button onClick={signUpBtn}>Sign up</button></div>
            <hr className='lineBreak' />
            <div className="createButton"><button onClick={() => setToggle(false)}>Login Instead</button></div>
            {togglingSpinner && <div className="spinner"><Spin /></div >}
        </div>
    )
}

const gettingURL = (file, uid) => {
    return new Promise((resolve, reject) => {
        const storageRef = ref(storage, `images/${uid}.png`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                reject(error);
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                });
            }
        );
    })
}


export default SignUp