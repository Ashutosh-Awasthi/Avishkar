import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
// import {motion} from "framer-motion"

const style = {
    img: {
        height: '100vh',
        width: '100vw',
    },
    Nav: {
        color: 'rgba(255,255,255,.9)',
        paddingTop: '0.3125rem',
        paddingBottom: '0.3125rem',
        marginRight: '1rem',
        fontSize: '1.25rem',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
    },
    heading: {
        position: 'absolute',
        top: '45vh',
        left: '50vw',
        transform: 'translate(-50%,-50%)',
        fontFamily: 'Brush Script MT, Brush Script Std, cursive',
        fontSize: '6rem',
        color: 'white'
    },
    para: {
        position: 'absolute',
        top: '60vh',
        left: '50vw',
        fontSize: '2rem',
        transform: 'translate(-50%,-50%)',
        textAlign: 'center',
    }
}
const Home = () => {
    return (
        <>
            <nav class="navbar navbar-light bg-transparent fixed-top" role="navigation">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#" style={{color: "white"}}>Foodie</a>
                    <NavLink style={style.Nav} to='/login'>Login</NavLink>
                </div>
            </nav>
            <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img style={style.img} src="https://cdn.wallpapersafari.com/73/68/UOYJ2W.jpeg" class="d-block w-100" alt="..." />
                    </div>
                    <div class="carousel-item">
                        <img style={style.img} src="https://www.zastavki.com/pictures/1920x1080/2017Food_Petite_french_fries_on_the_table_112985_23.jpg" class="d-block w-100" alt="..." />
                    </div>
                    <div style={style.img} class="carousel-item">
                        <img src="https://i.pinimg.com/originals/61/34/3d/61343d78d362190265b1e56d1cdd0956.jpg" class="d-block w-100" alt="..." />
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
            <h1 style={style.heading}>Be Healthy.</h1>
            <p style={style.para}>Start a new Journey with us. <NavLink to='/login'><button className="btn btn-success">Register</button></NavLink></p>
            
        </>
    )
}

export default Home
