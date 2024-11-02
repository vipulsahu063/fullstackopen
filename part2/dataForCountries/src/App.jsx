import axios from "axios"
import { useState, useEffect } from "react"

const App = () => {

  // holding countries data
  const [countryData, setCountryData] = useState([])
  // holding input value
  const [searchCountry, setSearchCountry] = useState('')
  // holding weather data
  const [weatherData, setWeatherData] = useState(null)
  // holding specific country data 
  const [showCountry, setShowCountry] = useState(null)
  
  
  
  // importing api key
  const api_key = import.meta.env.VITE_SOME_KEY
  
  // run this command to set api key as variable in startup
  // export VITE_SOME_KEY=d74cc16bbfd60184ef697008fea6e9b6 && npm run dev

  // featching all countries data
  useEffect(() => {
      
    axios
        .get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then(Response => { 
          setCountryData(Response.data)
        })
  }, [])

  // featcing specific country weather data when there is change in show country
  useEffect(() => {
    if(showCountry) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${showCountry.latlng[0]}&lon=${showCountry.latlng[1]}&appid=${api_key}&units=metric`)
        .then(Response => {
          setWeatherData(Response.data)
        })
    }
  }, [showCountry])

  // filtering countries according to search country
  const matchedCountries = countryData.filter(cd => (
    cd.name.common.toLowerCase().includes(searchCountry.toLowerCase())
  ))

  // whenever there is change in input value 
  // it will set to search country state to input value
  
  // and checks if there is only 1 country matching to 
  // input value it will set that country to show country 
  // which trigger weather api to fetch data
  const handleSearchCountryChange = (event) => {
    
    setSearchCountry(event.target.value)


    if(matchedCountries.length === 1) {
      setShowCountry(matchedCountries[0])
    } else {
      setShowCountry(null)
      setWeatherData(null)
    }

  }

  // setting specific country data sent as props to show country
  const handleClick = (country) => {
    setShowCountry(country)
  }

  
  
  // input element specified in variable
  const countryInput = (
    <div>
      find Countries: <input value={searchCountry} onChange={handleSearchCountryChange} />
    </div>
  )

  // condition specified in variable
  const tooManyMatches = (
    <p>Too many matches, specify another filter</p>
  )

  
  // country details specified in variable
  const countryDetails = showCountry && (
    <div>
      <h1>{showCountry.name.common}</h1>
      <p>capital {showCountry.capital}</p>
      <p>area {showCountry.area}</p>
      <strong>language:</strong>
      <ul>
        {Object.values(showCountry.languages || {}).map((lang, index) => (
          <li key={index}>{lang}</li>
        ))}
      </ul>
      <div style={{fontSize: "200px"}}>{showCountry.flag}</div>
      <h2>Weather in {showCountry.capital}</h2>
      <p>temperature {weatherData?.main?.temp} °C</p>
      <img src={`https://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}@2x.png`} />
      <p>wind {weatherData?.wind?.speed} m/s</p>
    </div>
  )

  // filtered countries with button variable
  const countryButton = matchedCountries.map(cd => (
    <div key={cd.cca3}>
      <h1>
        {cd.name.common} <button onClick={() => handleClick(cd)}>show</button>
      </h1>
    </div>
  ))

  // showing input variable
  // if country details is there it will show-up otherwise
  // if filtered countries is greater than 10 then first variable will show-up otherwise
  // country button variable will show-up
  return (
    <div>
      {countryInput}
      {countryDetails || (matchedCountries.length > 10 ? tooManyMatches : countryButton) }
    </div>
  )
}

export default App