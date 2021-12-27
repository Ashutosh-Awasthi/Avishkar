import React, { useEffect, useState, useRef } from 'react'

const Foodwiki = () => {
    const spinner = useRef()
    const si = useRef()
    const table = useRef()
    
    let fData

    const create = () => {
        const tbody = document.createElement('tbody')
        spinner.current.style.display = 'none'

        if (!fData.foods.length)
            alert('No Item found')
        else
            fData.foods[0].foodNutrients.forEach(item => {
                const tr = document.createElement('tr')
                const td1 = document.createElement('td')
                const td2 = document.createElement('td')

                td1.innerHTML = item.nutrientName
                td2.innerHTML = item.value + ' ' + item.unitName

                tr.appendChild(td1)
                tr.appendChild(td2)
                tbody.appendChild(tr)
            })

        table.current.appendChild(tbody)
    }

    const searchHandeler = e => {
        e.preventDefault()
        spinner.current.style.display = 'block'
        table.current.innerHTML = ''

        fetch(`https://api.nal.usda.gov/fdc/v1/foods/search/?api_key=OCp7jWX2fx2sGB5aN82ZPsIQh0HbNuxIjkj14Nuf&query=${si.current.value}`)
            .then(res => res.json()).then(data => {
                fData = data
                create()
            })
    }

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Foodwiki</h1>
            </div>
            <div>
                <div className="container"
                    id='res'>
                    <div className="input-group mb-3">
                        <input type="text" ref={si} className="form-control" placeholder="Search food" aria-label="Search food" aria-describedby="basic-addon1" />
                        <button id='search' className='btn btn-outline-secondary' onClick={searchHandeler}>Search</button>
                    </div>
                    <div className="text-center" ref={spinner} style={{ display: "none" }}>
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    <table ref={table} className="table table-hover"></table>
                </div>

            </div>
        </>
    )
}

export default Foodwiki
