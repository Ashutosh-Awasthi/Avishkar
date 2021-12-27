export const getData = async(props) => {
    try {
        const response = await fetch('/user/getuser',{
            method: 'GET',
            credentials: 'include'
        })
        const data = await response.json()
        
        return data
    }catch (err) {
        return null
    }
}
export default getData
