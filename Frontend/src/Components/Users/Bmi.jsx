import React from 'react'

const Bmi = () => {
    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">BMI</h1>
            </div>
            <div className="container">
                Your BMI: {JSON.parse(localStorage.user).physique.bmi.toFixed(2)}
                <hr />
                <table className="table table-hover">
                    <tbody>
                        <tr>
                            <th>Age</th>
                            <td>
                            {JSON.parse(localStorage.user).physique.age}
                            </td>
                        </tr>
                        <tr>
                            <th>Height</th>
                            <td>
                            {JSON.parse(localStorage.user).physique.height}
                            </td>
                        </tr>
                        <tr>
                            <th>Weight</th>
                            <td>
                            {JSON.parse(localStorage.user).physique.weight}
                            </td>
                        </tr>
                    </tbody>
                </table>


                <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
                                aria-expanded="true" aria-controls="collapseOne">
                                How Body Mass Index is Calculated ?
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne"
                            data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <strong>Formula:</strong> weight (kg) / [height (m)]2
                                With the metric system, the formula for BMI is weight in kilograms divided by height in meters squared.
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingThree">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                BMI Chart
                            </button>
                        </h2>
                        <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree"
                            data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <img src='https://www.cdc.gov/healthyweight/images/assessing/bmi-adult-fb-600x315.jpg' />
                                <p className="text-muted">Copyright: VikiVector | Credit: Getty Images/iStockphoto</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Bmi
