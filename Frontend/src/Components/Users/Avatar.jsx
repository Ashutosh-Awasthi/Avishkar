import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Avatar = (props) => {
    const fileInp = useRef()
    const spinner = useRef()
    const Navigate = useNavigate()

    const HandleSubmit = async e => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('file', fileInp.current.files[0])

        spinner.current.style.display = 'inline-block'
        // e.target.setAttribute('disabled','true')
        const response = await fetch(`/user/${localStorage.getItem('id')}/photo`, {
            method: 'PUT',
            credentials: 'include',
            body: formData
        })
        const data = await response.json()

        spinner.current.style.display = 'none'

        if (data.result) {
            localStorage.setItem('photo', data.image)
            console.log(props)
            props.setter(data.image)
            toast.success('Avatar update successful', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                progress: undefined,
            });
            Navigate('/user')
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
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Avatar</h1>
            </div>
            <div className="container">

                <div className="img d-flex justify-content-around" height='400px' width='100%'>
                    {
                        localStorage.photo ?
                            <img src={`data:img/gif;base64,${localStorage.photo}`} style={{ maxHeight: "400px", maxWidth: "100%", margin: "auto" }} />
                            :
                            <img src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                                style={{ maxHeight: "400px", maxWidth: "100%", margin: "auto" }} />
                    }

                </div>


                <form action="/user/<%= data._id %>/photo?_method=PUT" method="post" enctype="multipart/form-data" className='mt-4'>
                    <div className="row d-flex justify-content-around">
                        <div className="col-12 col-lg-6">
                            <input ref={fileInp} type="file" name='file' className='form-control' />
                        </div>
                        <div className="col">
                            {/* <button className='btn btn-outline-secondary' onClick={HandleSubmit}>Change Image</button> */}
                            <button class="btn btn-outline-secondary" onClick={HandleSubmit}>
                                <span ref={spinner} class="spinner-border spinner-border-sm" style={{display: 'none'}}/>
                                {' '}Change Image
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </>
    )
}

export default Avatar
