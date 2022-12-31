import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Auth from '../container/Auth/Auth'
import { useSelector } from "react-redux";
import Main from '../container/Main/Main'
import ErrorPage from '../container/ErrorPage/ErrorPage';

const Router = () => {

    const userStore = useSelector((state) => state.userStore.isLoggedIn);

    return (

        <Routes>
            <Route path='/' element={userStore ? <Main /> : <Auth />} />
            <Route path='/*' element={<ErrorPage />} />
        </Routes>

    )
}

export default Router