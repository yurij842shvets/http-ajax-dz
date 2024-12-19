const countriesApi = 'https://restcountries.com/v3.1/all?fields=name,capital,population,languages,flags';



export default async function fetchData(search) {
    console.log('hi', countriesApi)
    try {
        const getData = await fetch(countriesApi)
        if(!getData.ok) {
            throw new Error(`could not fetch data ${search}`)
        }
        return getData.json()
    } catch(err) {
        console.log(err)
    }
} 
fetchData()