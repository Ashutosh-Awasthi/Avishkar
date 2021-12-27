import React, { useEffect, useRef } from 'react'

const Styles = {
    bg: {
        background: "url('https://cdn.wallpapersafari.com/88/88/omdS0e.jpg')",
        backgroundSize: "cover",
        height: "100vh",
        width: "100vw",
        margin: 0
    }
}

const ForgotPass = () => {
    const email = useRef()

    const resetHandeler = e => {
        e.preventDefault()
        if (email.current.value === '')
            alert("email address required")
        else
            document.querySelector('form').submit()
    }

    useEffect(() => {
        document.title = 'Forgot Password'
    })

    return (
        <div style={Styles.bg}>
            <div className="container">
                <div class="row d-flex justify-content-center">
                    <div class="col-10 col-md-6">
                        <form action="/forget-pass" method="post" class='container' style={{
                            padding: '30px',
                            boxShadow: '0 2px 2px',
                            borderRadius: '5px',
                            border: '1px solid black',
                            marginTop: '10rem',
                            backgroundColor: 'rgb(255, 255, 255)'
                        }}>
                            <div class="mb-3">
                                <input ref={email} type="email" class="form-control" placeholder='Enter your email Id' name="email" />
                            </div>
                            <button type="submit" class="btn btn-secondary" id='sub' onClick={resetHandeler}>Reset</button>
                        </form>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default ForgotPass
