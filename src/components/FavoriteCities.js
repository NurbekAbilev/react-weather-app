import React from 'react';

// {
//   "id": 2801268,
//   "name": "London",
//   "region": "City of London, Greater London",
//   "country": "United Kingdom",
//   "lat": 51.52,
//   "lon": -0.11,
//   "url": "london-city-of-london-greater-london-united-kingdom"
// }

const FavoriteCities = ({cities}) => {

  // debugger;
  return (
    <div>
      <h1>Favorite Cities</h1>
      <div className='favorite-cities-container'>
        {cities.map((city) => {
          return <div>
            {city.name} {city.region} {city.country}
          </div>
        })}
      </div>
    </div>
  );
};

export default FavoriteCities;
