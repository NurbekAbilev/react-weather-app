import './App.css';
import Search from './components/Search';
import SelectedCity from './components/SelectedCity';
import { useEffect, useState } from 'react';
import { API_KEY } from './Constants';

const INITIAL_CITY_LONDON_ID = 2801268

async function loadCityById(cityID) {
  // const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  // await delay(2000); // 2-second delay for debugging

  const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=id:${cityID}&aqi=yes`)
  const jsonResponse = await response.json()
  return jsonResponse
}


function App() {
  const [isLoading, setLoading] = useState(false)
  const [city, setCity] = useState(null)
  // const [cityId, setCityId] = useState(null)

  function setCityHandler(cityID) {
    console.log('setCityHandler Event:', cityID)

    loadCityById(cityID).then((data) => {
      setCity(data)
    })
  }

  useEffect(() => {
    if (city === null) {
      setLoading(true)
      loadCityById(INITIAL_CITY_LONDON_ID).then((data) => {
        setCity(data)
        setLoading(false)
      })
    }
  }, [])

  return (
    <div className="app">
      <h1>🌤️ Weather app</h1>
      <Search handleSelectCity={setCityHandler}/>
      {isLoading && <p>Loading</p>}
      {!isLoading && <SelectedCity data={city}/>}
    </div>
  );
}

export default App;
