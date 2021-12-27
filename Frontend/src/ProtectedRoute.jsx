import React,{ useEffect,useState } from 'react'
import { AuthPending } from './Components/Usables/Error'
import {Navigate,Outlet} from 'react-router-dom'

const ProtectedRoute = () => {
    const [isAuthenticated,setIsAuthenticated]  =   useState("pending");

    useEffect(async () => {
        const reponse = await fetch('/user/isloggedin',{
            method: 'GET',
            credentials: 'include'
        })
        const data = await reponse.json()
        setIsAuthenticated(data.result)
    },[])

    if(isAuthenticated===true)
        return <Outlet/>
    else if(isAuthenticated==="pending")
        return <AuthPending/>
    else
        return <Navigate to='/login'/>
}

export default ProtectedRoute
