import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import getData from '../Usables/getData'
import ScaleLoader from "react-spinners/ScaleLoader"

const loaderStyles = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30vh'
}

const Profile = () => {
    const [loading, setloading] = useState(true)
    const navigate = useNavigate()

    const [usn, setusn] = useState('')
    const [email, setemail] = useState('')
    const [age, setage] = useState('')
    const [height, setheight] = useState('')
    const [weight, setweight] = useState('')
    const [bmi, setbmi] = useState('')

    useEffect(async () => {
        const data = await getData()
        setusn(data.username)
        setemail(data.email)
        setage(data.physique.age)
        setheight(data.physique.height)
        setweight(data.physique.weight)
        setbmi(data.physique.bmi)
        setTimeout(() => {
            setloading(false)
        }, 150)
    }, [])

    if (loading)
        return (
            <>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Profile</h1>
                </div><ScaleLoader css={loaderStyles} />
            </>)
            
    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Profile</h1>
                <button className="btn btn-sm btn-outline-secondary" onClick={e=>navigate(`/user/${localStorage.getItem('id')}/update`)}>Update</button>
            </div>
            <div className="container">
                <table className="table table-hover">
                    <tbody>
                        <tr>
                            <th>Username</th>
                            <td>{usn}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>{email}</td>
                        </tr>
                        <tr>
                            <th>Age</th>
                            <td>{age}</td>
                        </tr>
                        <tr>
                            <th>Height</th>
                            <td>{height}</td>
                        </tr>
                        <tr>
                            <th>Weight</th>
                            <td>{weight}</td>
                        </tr>
                        <tr>
                            <th>BMI</th>
                            <td>{bmi === '' ? bmi : bmi.toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Profile
