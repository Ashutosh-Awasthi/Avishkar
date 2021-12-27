import React, { useEffect, useRef } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

const Styles = {
    bg: {
        background: "url('https://c32-cdn.guidingtech.com/optim/assets/189900/winter_cocoa_cup-2880x1800_4d470f76dc99e18ad75087b1b8410ea9.jpg?1573742130')",
        // backgroundRepeat: 'no-repeat',
        height: '100vh',
        backgroundSize: 'cover',
        overflow: 'hidden',
    },
    tab: {
        backgroundColor: 'rgba(255,255,255,0.8)',
        padding: '0.5rem',
        marginRight: '2rem',
    },
    logo: {
        position: 'absolute',
        fontSize: '5rem',
        color: 'white',
        paddingTop: '30vh',
        paddingLeft: '20vw',
        fontFamily: 'Brush Script MT, Brush Script Std, cursive'
    },
    nav: {
        display: "block",
        padding: "0",
        color: "#0d6efd",
        textDecoration: "none",
        transition: "color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out"
    }
}

const Login = () => {
    useEffect(() => {
    }, [])

    const usn_login = useRef("");
    const pass_login = useRef("");
    const pass_reg = useRef("");
    const usn_reg = useRef("");
    const fname_reg = useRef("");
    const lname_reg = useRef("");
    const weight_reg = useRef("");
    const height_reg = useRef("");
    const age_reg = useRef("");
    const reg = useRef("");
    const lgn = useRef("");

    const navigate = useNavigate()

    const HandleLogin = async (e) => {
        e.preventDefault()
        let postData = {
            email: usn_login.current.value,
            password: pass_login.current.value
        }
        const response = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify(postData),
            headers: {
                "Content-Type": 'application/json'
            }
        })
        const data = await response.json()

        if (data.result) {
            window.localStorage.setItem('id', data.user._id)
            window.localStorage.setItem('user', JSON.stringify(data.user))
            window.localStorage.setItem('photo', data.user.image)
            navigate('/user')
        } else
            toast.error(`${data.message}`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                progress: undefined,
            });
    }

    const HandleRegister = async (e) => {
        e.preventDefault()
        let postData = {
            email: usn_reg.current.value,
            password: pass_reg.current.value,
            fname: fname_reg.current.value,
            lname: lname_reg.current.value,
            height: height_reg.current.value,
            weight: weight_reg.current.value,
            age: age_reg.current.value,
        }
        const response = await fetch('/register', {
            method: 'POST',
            body: JSON.stringify(postData),
            headers: {
                "Content-Type": 'application/json'
            }
        })
        const data = await response.json()
        console.log(data)

        if (data.result) {
            window.localStorage.setItem('id', data.user._id)
            window.localStorage.setItem('user', JSON.stringify(data.user))
            window.localStorage.setItem('photo', data.user.image)
            navigate('/user')
        } else
            toast.error(`${data.message}`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                progress: undefined,
            });
    }

    return (
        <div className="form" style={Styles.bg}>
            <ToastContainer />
            <div class="btn-group" style={{ padding: '0.5rem 0 0 0.5rem' }} role="group" aria-label="Basic example">
                <button className="btn btn-secondary"
                    onClick={e => {
                        reg.current.style.display = 'inline-block'
                        lgn.current.style.display = 'none'
                        e.target.classList.add('disabled')
                        document.querySelector('.btn-warning').classList.remove('disabled')
                    }}>Sign up</button>

                <button className="btn btn-warning disabled" onClick={e => {
                    reg.current.style.display = 'none'
                    lgn.current.style.display = 'inline-block'
                    e.target.classList.add('disabled')
                    document.querySelector('.btn-secondary').classList.remove('disabled')
                }}>Log In</button>
            </div>

            <div style={Styles.logo}>
                <em>Get Started</em>
            </div>

            <div className="tab-content d-flex justify-content-end">

                <div class="card" ref={reg} style={{ width: "18rem", display: "none", ...Styles.tab }}>
                    <div class="card-body">
                        <h5 class="card-title">Sign Up for Free</h5>
                        <form method="post">

                            <div className="top-row">
                                <div className="field-wrap">
                                    <label>
                                        First Name<span className="req">*</span>
                                    </label>
                                    <input className="form-control" type="text" required autocomplete="off" name='fname' ref={fname_reg} />
                                </div>

                                <div className="field-wrap">
                                    <label>
                                        Last Name<span className="req">*</span>
                                    </label>
                                    <input className="form-control" type="text" required autocomplete="off" name='lname' ref={lname_reg} />
                                </div>
                            </div>

                            <div className="top-row">
                                <div className="field-wrap">
                                    <label>
                                        Weight(Kg)<span className="req">*</span>
                                    </label>
                                    <input className="form-control" type="text" required autocomplete="off" name='weight' ref={weight_reg} />
                                </div>

                                <div className="field-wrap">
                                    <label>
                                        Height(ft.)<span className="req">*</span>
                                    </label>
                                    <input className="form-control" type="text" required autocomplete="off" name='height' ref={height_reg} />
                                </div>
                            </div>
                            <div className="field-wrap">
                                <label>
                                    Age<span className="req">*</span>
                                </label>
                                <input className="form-control" type="text" required autocomplete="off" name='age' ref={age_reg} />
                            </div>

                            <div className="field-wrap">
                                <label>
                                    Email Address<span className="req">*</span>
                                </label>
                                <input className="form-control" type="email" required autocomplete="off" name='email' ref={usn_reg} />
                            </div>

                            <div className="field-wrap">
                                <label>
                                    Set A Password<span className="req">*</span>
                                </label>
                                <input className="form-control" type="password" required autocomplete="off" name='password' ref={pass_reg} />
                            </div>

                            <button type="submit" style={{ marginTop: "0.5rem" }} className="btn btn-sm btn-secondary" onClick={HandleRegister}>Get Started</button>

                        </form>

                    </div>
                </div>

                <div class="card" ref={lgn}
                    style={{ width: "18rem", ...Styles.tab }}>
                    <div class="card-body">
                        <h5 class="card-title">Welcome Back!</h5>
                        <form method="post">
                            <div className="field-wrap">
                                <label>
                                    Email Address<span className="req">*</span>
                                </label>
                                <input className="form-control" type="email" required autocomplete="off" name='email' ref={usn_login} />
                            </div>

                            <div className="field-wrap">
                                <label>
                                    Password<span className="req">*</span>
                                </label>
                                <input className="form-control" type="password" required autocomplete="off" name='password' ref={pass_login} />
                            </div>

                            <p className="forgot"><NavLink style={Styles.nav} to="/forget-pass">Forgot Password?</NavLink></p>

                            <button className="btn btn-sm btn-secondary" onClick={HandleLogin}>Log In</button>

                        </form>
                    </div>
                </div>


            </div>

        </div>
    )
}

export default Login
