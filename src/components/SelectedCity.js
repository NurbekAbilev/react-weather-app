import React from 'react';

const SelectedCity = ({ data }) => {
  console.log('JSON data passed to SelectedCity:', data)

  if (data === null) {
    return <></>
  }

  return (
    <div>
      <div className='selected-city-container'>
        <div>
          <div className='selected-city-location-title' title={data.location.region + data.location.country}>
            🏙️ {data.location.name}
          </div>
          <div className='selected-city-location-time' title={data.location.tz_id}>
            🕰️ {data.location.localtime}
          </div>
          <div>
            🌡°C{data.current.temp_c}/°F{data.current.temp_f}
          </div>
          <div>
            🌬️ {data.current.wind_kph} km/h
          </div>
          <div>
            💧 {data.current.humidity}%
          </div>
        </div>
        <div className='selected-city-weather-status'>
          <div>
            <div>{data.current.condition.text}</div>
            <img src={data.current.condition.icon} alt={data.current.condition.text} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedCity;
