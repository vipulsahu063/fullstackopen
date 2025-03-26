import axios from 'axios'
import { useState, useEffect } from 'react'

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  console.log(country)

  useEffect(() => {
    if(!name) return
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
        .then(response => setCountry(response.data)) 
  }, [name])

  return country
}

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}