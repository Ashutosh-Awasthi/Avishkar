import React,{useState, useEffect} from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'
import ScaleLoader from "react-spinners/ScaleLoader"
import { toast } from 'react-toastify'
import { useNavigate} from 'react-router-dom'

const labels = [];
const values = [];

const data = {
  labels,
  datasets: [
    {
      label: 'Nutrients intake',
      data: values
    }
  ],
};

const loaderStyles = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '30vh'
}


const Reports = () => {

  const [loading, setloading] = useState(true)
  const navigate = useNavigate()

  useEffect(async() => {
    fetch('/nutrition/dietdata',{
      method: 'GET',
      credentials: 'include'
    }).then(response =>response.json()).then(data => {
      console.log(data)

      if(data.length > 0) {
          data.forEach(item=>{
          item.foodNutrients.forEach(nut=>{
            labels.push(nut.nutrientName)
            values.push(nut.nutrientNumber*item.intake) 
          })
        })
        setloading(false)
      }else{
        toast.error(`No diet added`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
        });
        navigate('/user/diet')
      }      
    })
  },[])

  const resetHandeler = (e)=>{
    fetch('/nutrition/clear').then(response=>response.json()).then(data=>{
      if(data.result){
        navigate('/user')
        toast.success(`Data Reset Success`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
        });
      }else{
        toast.error(`Couldn't Reset Data, Try again later`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
        });
      }
    })
  }

  if (loading)
    return (
      <>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Reports</h1>
          <button className="btn btn-sm btn-outline-secondary" onClick={resetHandeler}>Reset</button>
        </div><ScaleLoader css={loaderStyles} />
      </>)
  
  return (
    <div>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Reports</h1>
          <button className="btn btn-sm btn-outline-secondary" onClick={resetHandeler}>Reset</button>
        </div>
      <Bar data={data} />
    </div>
  )
}

export default Reports
