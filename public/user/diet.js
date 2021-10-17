const m = document.querySelector('#morning')
const n = document.querySelector('#noon')
const e = document.querySelector('#evening')
const res = document.querySelector('.res')
const lm = document.querySelector('.breakfast')
const ln = document.querySelector('.lunch')
const le = document.querySelector('.dinner')
let fetchData = []
const tC = document.querySelector('.tC')
let count = 0


// functions
const removeItem=(e,p)=>{
    e.stopPropagation() 
    tC.innerHTML = `Total Calorie Count: ${count} KCal`
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
        const q = document.querySelector('#'+type).value
        fetch(`http://localhost:8080/nutrition/?q=${q}`)
        .then(res=>res.json())
        .then(data=>{
            if(data.parsed.length){
                data.parsed.forEach(item => {
                    const p = document.createElement('p')
                    p.setAttribute('id',item.food.foodId)
                    p.setAttribute('q',item.quantity||1)
                    p.innerHTML = item.food.label + ` Quantity: ${item.quantity||1}`
                    fetchData.push({...item,quan: item.quantity||1})
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


