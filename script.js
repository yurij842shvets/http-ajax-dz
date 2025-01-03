
const getInput = document.querySelector('input');  
const getDataContainer = document.querySelector('.data-container');  
console.log(getInput);  
console.log(getDataContainer);  
  
  
  
// import { fetchData } from './fetchCountries'   
// console.log(fetchData);  
  
  
const countriesApi = 'https://restcountries.com/v3.1/all?fields=name,capital,population,languages,flags';  
async function fetchData(search) {  
    // console.log('hi', countriesApi)   
    try {  
        const getData = await fetch(countriesApi)  
        console.log(getData)  
        if (!getData.ok) {  
            throw new Error(`could not fetch data ${search}`)  
        }  
        return getData.json()  
    } catch (err) {  
        console.log(err)  
    }  
}  
fetchData()  
  
//script.js  
  
async function showCountriesData(e) {  
    const edit = e.target.value.trim().toLowerCase() 
    if (!edit) { 
        getDataContainer.innerHTML = "" 
        return; 
    } 
    const getFetchData = await fetchData()  
    const filterCountries = getFetchData.filter(country => country.name.official.toLowerCase().includes(edit))  
    if(filterCountries.length === 1){
        renderCountries(filterCountries[0])
    } else if(filterCountries.length > 1 && filterCountries.length <= 10) {
        renderCountries(filterCountries)
    } else if(filterCountries.length > 10){
        getDataContainer.innerHTML = `  
        <p>Забагато співпадінь, змініть параметр пошуку.</p>`
    } else {
        getDataContainer.innerHTML = `  
        <p>Не знайдено</p>`
    }
}  
function renderCountries(country) {  
const { name, flags, capital, population, languages } = country;  
        const officialName = name.official  
        const countryFlags = flags.png  
        const countryLanguages = Object.values(languages).join(', ')  
        const alt = 'Прапор не знайдено'  
        getDataContainer.innerHTML = `  
        <p>${officialName}</p>  
        <p>${capital}</p>  
        <p>${population}</p>  
        <img alt='${alt}' src='${countryFlags}'>  
        <p>${countryLanguages}</p>  
    ` 
} 
function renderCountriesList(countries){ 
    getDataContainer.innerHTML=countries.map((country)=> `<p>${country.name.official}</p>`).join('') 
}
getInput.addEventListener('input', showCountriesData)