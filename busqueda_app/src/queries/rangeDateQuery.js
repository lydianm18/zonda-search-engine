import {endpoint} from '../config.json'

export const dateRange = async (startDate, endDate) => {
    try{
        const fetchData = await fetch(`${endpoint}/_search?q=DELIVERY_FROM_DAT:[${startDate}+TO+${endDate}]ANDDELIVERY_TO_DAT:[${startDate}+TO+${endDate}]`)
        let resJson = await fetchData.json()
        return resJson
        
    } catch(e){
        console.log(e)
    }
    
}