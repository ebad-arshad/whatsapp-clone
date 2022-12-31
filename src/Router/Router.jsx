import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Auth from '../container/Auth/Auth'
import { useDispatch, useSelector } from "react-redux";
import Main from '../container/Main/Main'
import ErrorPage from '../container/ErrorPage/ErrorPage';
import { auth, onAuthStateChanged } from '../Firebase/Firebase';

const Router = () => {

    const dispatch = useDispatch();
    const userStore = useSelector((state) => state.userStore.isLoggedIn);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const userData = JSON.stringify(user);
                dispatch({ type: 'SIGNEDIN', userData });
            }
        });
    }, [dispatch])

    return (

        <Routes>
            <Route path='/' element={userStore ? <Main /> : <Auth />} />
            <Route path='/*' element={<ErrorPage />} />
        </Routes>

    )
}

export default Router