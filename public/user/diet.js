const m = document.querySelector('#morning')
const n = document.querySelector('#noon')
const e = document.querySelector('#evening')
const res = document.querySelector('.res')
const lm = document.querySelector('.breakfast')
const ln = document.querySelector('.lunch')
const le = document.querySelector('.dinner')
const set = document.querySelector('#set')
const sel = document.querySelector('select')
let fetchData = new Set()
const tC = document.querySelector('.tC')
let count = 0


// functions
set.addEventListener('click',e=>{
    let data={
        breakfast:[],
        lunch:[],
        dinner:[]
    }

    lm.querySelectorAll('p').forEach(item=>{
        data.breakfast.push(item.getAttribute('id'))
    })
    ln.querySelectorAll('p').forEach(item=>{
        data.lunch.push(item.getAttribute('id'))
    })
    le.querySelectorAll('p').forEach(item=>{
        data.dinner.push(item.getAttribute('id'))
    })

    console.log(data)

    fetch('http://localhost:8080/user/daily',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded'
        },
        credentials: 'include',
        body: JSON.stringify(data)
        // body: data
    }).then(res=>res.json()).then(d=>console.log(d))
})

const removeItem=(e,p)=>{
    e.stopPropagation() 
    // tC.innerHTML = `Total Calorie Count: ${count} KCal`
    console.log(p.innerHTML) 

    p.remove()
}

const addItem = (p,type)=>{
    switch(type){
        case 'breakfast': lm.appendChild(p)
                        break;
        case 'lunch': ln.appendChild(p)
                        break;
        case 'dinner': le.appendChild(p)
                        break;
    }
    p.addEventListener('click',e=>removeItem(e,p))
}

const clickHandeler=(ele,type)=>{
    ele.addEventListener('click',e=>{
        e.preventDefault()
        e.stopPropagation()
        res.innerHTML='<div>Search Results</div><hr>'

        const q = document.querySelector('#'+type).value
        fetch(`http://localhost:8080/nutrition/?q=${q}`)
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.foods.length){
                data.foods.forEach(item => {
                    const p = document.createElement('p')
                    p.innerHTML = item.description
                    p.setAttribute('id',item.fdcId)
                    fetchData.add(item)
                    res.appendChild(p)
                    p.addEventListener('click',e=> addItem(p,type))
                })
            }
            else
                alert('item not found')
        })
    })
}

// using functions
clickHandeler(m,'breakfast')
clickHandeler(n,'lunch')
clickHandeler(e,'dinner')


