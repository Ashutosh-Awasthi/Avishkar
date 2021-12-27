import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import getData from '../Usables/getData'

const Update = () => {
    const Navigate = useNavigate()
    const usn = useRef()
    const age = useRef()
    const height = useRef()
    const weight = useRef()

    useEffect(async () => {
        const data = await getData()
        usn.current.value = data.username
        age.current.value = data.physique.age
        height.current.value = data.physique.height
        weight.current.value = data.physique.weight
    }, [])

    const HandleUpdate = async e => {
        e.preventDefault()
        const response = await fetch(`/user/${localStorage.getItem('id')}`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: usn.current.value,
                age: age.current.value,
                height: height.current.value,
                weight: weight.current.value
            })
        })
        const data = await response.json()
        if (data.result) {
            toast.success('Update successfull', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                progress: undefined,
            });
            Navigate('/user')
        }
        else
            toast.error(`Failed to update`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                progress: undefined,
            });
    }

    return (
        <>
            <ToastContainer/>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Update Profile</h1>
            </div>
            <div className="container">
                <form>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Username</span>
                        <input type="text" className="form-control" placeholder="Username" ref={usn} name="username" />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Age</span>
                        <input type="text" className="form-control" placeholder="Age" ref={age} name="age" />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Height</span>
                        <input type="text" className="form-control" placeholder="Height" ref={height} name="height" />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Weight</span>
                        <input type="text" className="form-control" placeholder="Weight" ref={weight} name="weight" />
                    </div>
                    <button type="submit" className="btn btn-secondary" onClick={HandleUpdate}>Update</button>
                </form>
            </div>
        </>
    )
}

export default Update
