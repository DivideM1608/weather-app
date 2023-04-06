import React, { useState, useEffect } from 'react';

function Clock({ lat, lon }) {
    const [time, setTime] = useState(null);
  
    useEffect(() => {
      const apiKey = '4YKC6O7VC23Z'; // Thay YOUR_API_KEY bằng API key của bạn
      const apiUrl = `http://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${lat}&lng=${lon}`;
  
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          const localTime = new Date(data.formatted);
          setTime(localTime.toLocaleTimeString());
        })
        .catch(error => console.error(error));
    }, [lat, lon]);
  
    return (
      <div className='time-city'>
        {time ? time : 'Loading...'}
      </div>
    );
  }
  
  export default Clock;