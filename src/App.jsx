import AdsPage from './pages/ads/index'
import AdDetails from './pages/ad/index'
import New from './pages/type/new/index'
import Login from './pages/login/index'
import Registration from './pages/registration/index'
import Admin from './pages/admin'
import Moderator from './pages/moderator'
import Create from './pages/create'
import Header from '../src/components/header/Header'
import fetchAdDetails from './utils/fetchAdDetails'
import ErrorPage from './pages/error'
import AdEditWrappe from './pages/editAd'
import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useParams, useNavigate, HashRouter } from "react-router-dom";


const ProtectedRouteAdmin = ({
    role,
    redirectPath = '/error',
    children,
}) => {
    if (role !== 'admin') {
        return <Navigate to={redirectPath} replace />;
    }

    return children;
};

const ProtectedRouteModer = ({
    role,
    redirectPath = '/error',
    children,
}) => {
    if (role !== 'moderator' && role !== 'admin') {
        return <Navigate to={redirectPath} replace />;
    }

    return children;
};



export default function App() {
    const role = localStorage.getItem('role');

    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<AdsPage />}>
                    <Route index element={<New />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
                <Route path='/create' element={<Create />} />
                <Route path='/ads/:id' element={<AdDetails />} />
                <Route path='/ads/edit/:id' element={<AdEditWrappe />} />

                <Route
                    path="/admin"
                    element={
                        <ProtectedRouteAdmin role={role}>
                            <Admin />
                        </ProtectedRouteAdmin>
                    } 
                />
                <Route
                    path="/moderator"
                    element={
                        <ProtectedRouteModer role={role}>
                            <Moderator />
                        </ProtectedRouteModer>
                    } 
                />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </>
    )
}

