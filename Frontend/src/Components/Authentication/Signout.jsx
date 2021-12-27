import React,{useEffect,useState} from 'react'
import {Navigate} from 'react-router-dom'

const Signout = () => {
    const [isLoggedOut,setisLoggedOut] = useState(false)
    
    useEffect(async() => {
        const response = await fetch('/logout',{
            method: 'GET',
            credentials: 'include',
        })
        const data = await response.json()
        if(data.result){
            localStorage.clear()
            setisLoggedOut(true)
        } 
    },[])

    if(isLoggedOut)
        return (
            <Navigate to="/login" />
        )
    else
        return (
            <h1>
                Logging you Out...
            </h1>
        )
}

export default Signout
