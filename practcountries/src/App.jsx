import axios from 'axios';

import { useState, useEffect } from 'react';

const App = () => {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [selectCountry, setSelectCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  //countries effect
  useEffect(() => {
    console.log('useEffec for countries info', countries)
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then(res => {
      console.log('these are data from the response', res.data)
      setCountries(res.data)
    })
  }, [])


  //filtering countries
  const filterCountries = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))


  //weather api effect
  useEffect(() => {
    if (!selectCountry && filterCountries.length !== 1) return
    const country = selectCountry || filterCountries[0]
    const capital = country.capital[0]
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`).then(res => {
      console.log('weather api data', res.data)
      setWeather(res.data)
    }).catch(error => {
      console.log('error happen here', error)
    })
  }, [selectCountry, search, countries])

  //saving values from input field
  const handleValues = (event) => {
    setSearch(event.target.value)
    setSelectCountry(null)
    console.log('targetting values', event.target.value)

  }

  console.log('data state', countries)
  console.log('button clicked and country selected', selectCountry)
  console.log('weather state', weather)

  return (
    <div>
      <h1>Countries Information</h1>
      <div>find countries <input value={search} onChange={handleValues} /></div>

      {/* logic for showing 1 country */}

      {filterCountries.length === 1 && (
        <div>
          <h1>{filterCountries[0].name.common}</h1>
          <p>Capital {filterCountries[0].capital} </p>
          <p>Area {filterCountries[0].area} </p>
          <h1>Languages</h1>
          <ul>
            {filterCountries[0].languages && Object.values(filterCountries[0].languages).map((lang, index) => (
              <li key={index}>{lang}</li>
            ))}
          </ul>
          <img src={filterCountries[0].flags.png} alt={`${filterCountries[0].name.common} flags`} width='150' />

           {weather && (
             <div>
                <h1>Weather in {weather.name} </h1>
                <div>Temperature {weather.main.temp} Celsius</div>
                <img src='/weatherImg.png' alt="weather img" width='140' />
                <p>Wind {weather.wind.speed} m/s</p>
             </div>
          )}
        </div>
      )}

      {/* logic for selecting countries from the list 2-10 */}
      {selectCountry && (
        <div>
          <h1>{selectCountry.name.common}</h1>
          <div>Capital {selectCountry.capital} </div>
          <div>Area {selectCountry.area} </div>
          <h1>Languages</h1>
          <ul>
            {selectCountry.languages &&
              Object.values(selectCountry.languages).map((lang, index) => (
                <li key={index}>{lang}</li>
              ))
            }
          </ul>

          <img src={selectCountry.flags.png} alt={`${selectCountry.name.common} flag`} width='150' />

          {weather && (
             <div>
                <h1>Weather in {weather.name} </h1>
                <div>Temperature {weather.main.temp} Celsius</div>
                <img src='/weatherImg.png' alt="weather img" width='140' />
                <p>Wind {weather.wind.speed} m/s</p>
             </div>
          )}
        </div>
      )}

      {/* logic for countries rang from 2-10 */}
      {!selectCountry && filterCountries.length > 1 && filterCountries.length <= 10 && (
        <div>
          {filterCountries.map(country => (
            <div key={country.name.common}>
              {country.name.common}
              <button onClick={() => setSelectCountry(country)}>show</button>
            </div>
          ))}
        </div>
      )}

      {/* logic for more than 10 countries */}

      {filterCountries.length > 10 && (
        <div>too many matches, please specify another filter</div>
      )}
    </div>
  )
}

export default App
