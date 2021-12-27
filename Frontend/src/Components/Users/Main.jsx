import React,{useEffect,useState} from 'react'
import { Routes,Route, NavLink } from 'react-router-dom'
import { encode } from 'js-base64'
import Profile from './Profile'
import Bmi from './Bmi'
import Foodwiki from './Foodwiki'
import Diet from './Diet'
import Update from './Update'
import Avatar from './Avatar'
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Reports from './Reports'

const NavStyles = {
    display: "block",
    padding: "0.5rem 1rem",
    color: "#0d6efd",
    textDecoration: "none",
    transition: "color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out"
}

const Main = () => {

    const [img,setimg] = useState(localStorage.photo)

    // useEffect(()=>{
    //     setimg(localStorage.photo)
    // },[localStorage.photo])


    return (
        <>
            <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                <NavLink className="navbar-brand col-md-3 col-lg-2 me-0 px-3" to='/'>Foodie</NavLink>
                <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-toggle="collapse" data-target="#demo">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-nav">
                    <div className="nav-item text-nowrap">
                        <NavLink className="nav-link px-3" id='logout' to="/signout">Sign out</NavLink>
                    </div>
                </div>
            </header>



            <div className="container-fluid">
                <div className="row">
                    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                        <div className="position-sticky pt-3">  
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <NavLink to={`/user/${localStorage.getItem('id')}/photo`}>
                                        {JSON.parse(localStorage.getItem('user')).image ?
                                        <img src={`data:img/gif;base64,${img}`} height="225px" width="100%" class="img-thumbnail"/>
                                        :
                                        <img src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" height="100px" width="100%" className="img-thumbnail" />} 
                                        
                                    </NavLink>
                                </li>
                                <hr />

                                <li className="nav-item">
                                    <NavLink className="nav-link" aria-current="page" to="/user" style={NavStyles}>
                                        <span data-feather="home"></span>
                                        Profile
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="report" style={NavStyles}>
                                        <span data-feather="file"></span>
                                        Reports
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="foodwiki" style={NavStyles}>
                                        <span data-feather="file"></span>
                                        Foodwiki
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="bmi" style={NavStyles}>
                                        <span data-feather="shopping-cart"></span>
                                        BMI
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="diet" style={NavStyles}>
                                        <span data-feather="users"></span>
                                        Daily Diet
                                    </NavLink>
                                </li>
                            </ul>

                            <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                                <span>Navigation</span>
                                <a className="link-secondary" href="#" aria-label="Add a new report">
                                    <span data-feather="plus-circle"></span>
                                </a>
                            </h6>
                            <ul className="nav flex-column mb-2">
                                <li className="nav-item">
                                    <a className="nav-link" href="/">
                                        <span data-feather="file-text"></span>
                                        Home
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <ToastContainer/>

                        <Routes>
                            <Route path="bmi" element={<Bmi/>} end={true} />
                            <Route path="foodwiki" element={<Foodwiki/>} end={true} />
                            <Route path="diet" element={<Diet/>} end={true} />
                            <Route path=":id/update" element={<Update/>} end={true} />
                            <Route path=":id/photo" element={<Avatar setter={setimg}/>} end={true} />
                            <Route path="report" element={<Reports/>} end={true} />
                            <Route path="*" element={<Profile/>} end={true} />
                        </Routes>

                        <canvas className="my-4 w-100" id="myChart" width="900" height="380"></canvas>

                    </main>
                </div>
            </div>
        </>
    )
}

export default Main
