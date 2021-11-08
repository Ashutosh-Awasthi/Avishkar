const s = document.querySelector('#search')
const si = document.querySelector('#sinput')
const res = document.querySelector('#res')
const table = document.createElement('table')
const spinner = document.querySelector('#spinner')

let fData

const create=()=>{
    table.setAttribute('class','table table-hover')
    const tbody = document.createElement('tbody')

    if(!fData.foods.length)
        alert('No Item found')
    
    else
        fData.foods[0].foodNutrients.forEach(item=>{
            const tr = document.createElement('tr')
            const td1 = document.createElement('td')
            const td2 = document.createElement('td')

            td1.innerHTML = item.nutrientName
            td2.innerHTML = item.value+' '+item.unitName

            tr.appendChild(td1)
            tr.appendChild(td2)
            tbody.appendChild(tr)
        })

    table.appendChild(tbody)
    spinner.style.display = 'none'
    res.appendChild(table)
}

s.addEventListener('click',e=>{
    table.innerHTML=''
    spinner.style.display = 'block'

    fetch(`https://api.nal.usda.gov/fdc/v1/foods/search/?api_key=OCp7jWX2fx2sGB5aN82ZPsIQh0HbNuxIjkj14Nuf&query=${si.value}`)
    .then(res=>res.json()).then(data=>{
        fData = data
        create()
    })
})