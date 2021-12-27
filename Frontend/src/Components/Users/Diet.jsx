import React, { useState, useEffect, useRef } from 'react'
import { toast } from 'react-toastify';
import '../../Styles/diet.module.css'

let dietData = [];

const Diet = () => {

    const search = useRef()
    const intake = useRef(1)
    const [sresult, setSresult] = useState()

    const clickHandler = async e => {
        e.preventDefault()
        fetch(`https://api.nal.usda.gov/fdc/v1/foods/search/?api_key=OCp7jWX2fx2sGB5aN82ZPsIQh0HbNuxIjkj14Nuf&query=${search.current.value}`)
            .then(res => res.json()).then(data => {
                setSresult({ ...data.foods[0], intake: intake.current.value })
            })
    }

    const addHandler = async e => {
        let obj = { ...sresult, intake: intake.current.value  }
        await setSresult(obj)
        console.log(sresult)
        dietData = [...dietData, sresult]
    }

    const submitHandler = e => {
        fetch('/nutrition/dietdata', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(dietData)
        }).then(response => response.json()).then(data => {
            console.log(data);
            if (data.result)
                toast.success(`${data.message}`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    progress: undefined,
                });
            else
                toast.error(`${data.message}`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    progress: undefined,
                });

        }).catch((err) => {
            console.log(err)
        })
    }

    return (

        <>
            <form class="input-group flex-nowrap" style={{ width: "18rem" }}>
                <input type="text" className="form-control" placeholder="Search food" ref={search} />
                <button className="btn btn-sm btn-secondary" onClick={clickHandler}>Add</button>
            </form>


            <div className="container" style={{ height: '30vh' }}>
                <div className="row">
                    What do you eat in a day?
                </div>
            </div>
            <div className="card" style={{ width: "36rem" }}>
                <p class="card-title">Search results</p>

                <div className="card-body">
                    <p>{sresult ? sresult.description : ''}</p>

                </div>
            </div>

            <div class="input-group flex-nowrap" style={{ width: "36rem" }}>
                <span class="input-group-text">How often do you eat?</span>
                <select className="form-control" ref={intake}>
                    <option value={1}>Daily</option>
                    <option value={1/7}>Weekly</option>
                    <option value={1/30.5}>Monthly</option>
                    <option value={1/365}>Yearly</option>
                </select>
                <button className="btn btn-secondary" onClick={addHandler}>Add item</button>
                <button className="btn btn-secondary" onClick={submitHandler}>Final Submit</button>
            </div>

        </>
    )
}

export default Diet
