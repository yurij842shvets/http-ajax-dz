import { fetchData } from './fetchCountries'
console.log(fetchData, 'hi')

async function getCountries(search) {
    const countriesData = await fetchData()
}