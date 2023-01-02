import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Auth from '../container/Auth/Auth'
import Main from '../container/Main/Main'
import ErrorPage from '../container/ErrorPage/ErrorPage';
import { auth, onAuthStateChanged } from '../Firebase/Firebase';
import { useDispatch } from 'react-redux';

const Router = () => {

    const dispatch = useDispatch();

    const [user, setUser] = useState();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const userData = JSON.stringify(user);
                dispatch({ type: 'SIGNEDIN', userData })
                setUser(true)
            } else {
                setUser(false)
            }
        });
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={user ? <Main /> : <Auth />} />
                <Route path='/*' element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router