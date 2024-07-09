import React from 'react';

const SelectedCity = ({data}) => {
  console.log('JSON data passed to SelectedCity:', data)

  if(data === null) {
    return <></>
  }
  
  return (
    <div>
      <div className='selected-city-container'>
          <ul>
            <li>{data.location.name}</li>
            <li>{data.location.region}</li>
            <li>{data.location.country}</li>
            <li>temp_c : {data.current.temp_c}</li>
            <li>temp_f : {data.current.temp_f}</li>
            <li>condition_text: {data.current.condition.text}</li>
            <li>condition_icon: {data.current.condition.icon}</li>
          </ul>
          
      </div>
    </div>
  );
};

export default SelectedCity;
