import './App.css';
import Search from './components/Search';
import FavoriteCities from './components/FavoriteCities';
import { useState } from 'react';

function App() {

  const [cities, setCities] = useState([
    {
      "id": 2801268,
      "name": "London",
      "region": "City of London, Greater London",
      "country": "United Kingdom",
      "lat": 51.52,
      "lon": -0.11,
      "url": "london-city-of-london-greater-london-united-kingdom"
    }
  ])

  function handleAddFavorite(city) {
      // debugger;
      const newCities = cities.slice()
      setCities([...newCities, city])
  }

  return (
    <div className="app">
      <Search addFavorite={handleAddFavorite}/>
      <FavoriteCities cities={cities}/>
    </div>
  );
}

export default App;
