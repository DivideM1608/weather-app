import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { ICON_MAP } from './icons/iconMap'
import Map from '../components/Map'
import Clock from '../components/Clock'


function City() {
  const [l1, setL1] = useState(null);
  const [l2, setL2] = useState(null);
  const [l3, setL3] = useState(null);
  const [l4, setL4] = useState(null);
  const [city, setCity] = useState("Tokyo, Japan");
  const [showNumber, setShowNumber] = useState(l1);
  const handleClick = (event, message, number) => {
    console.log(showNumber)
    setCity(message);
    setShowNumber(number);
  };
  const cities = {
    "Tokyo, Japan": [35.6895, 139.6917],
    "New York, USA": [40.7128, -74.0060],
    "London, UK": [51.5074, -0.1278],
    "Mumbai, India": [19.0760, 72.8777],
    "Sao Paulo, Brazil": [-23.5505, -46.6333],
    "Shanghai, China": [31.2304, 121.4737],
    "Moscow, Russia": [55.7558, 37.6173],
    "Istanbul, Turkey": [41.0082, 28.9784],
    "Paris, France": [48.8566, 2.3522],
    "Seoul, South Korea": [37.5665, 126.9780],
    "Beijing, China": [39.9042, 116.4074],
    "Jakarta, Indonesia": [-6.2088, 106.8456],
    "Los Angeles, USA": [34.0522, -118.2437],
    "Cairo, Egypt": [30.0444, 31.2357],
    "Mexico City, Mexico": [19.4326, -99.1332],
    "Bangkok, Thailand": [13.7563, 100.5018],
    "Buenos Aires, Argentina": [-34.6037, -58.3816],
    "Delhi, India": [28.7041, 77.1025],
    "Rio de Janeiro, Brazil": [-22.9068, -43.1729],
    "Osaka, Japan": [34.6937, 135.5023],
    "Karachi, Pakistan": [24.8607, 67.0011],
    "Manila, Philippines": [14.5995, 120.9842],
    "Tianjin, China": [39.0842, 117.2009],
    "Mumbai, India": [19.0760, 72.8777],
    "Guangzhou, China": [23.1291, 113.2644],
    "Moscow, Russia": [55.7558, 37.6173],
    "Shenzhen, China": [22.5431, 114.0579],
    "Dhaka, Bangladesh": [23.8103, 90.4125],
    "Istanbul, Turkey": [41.0082, 28.9784],
    "Paris, France": [48.8566, 2.3522],
    "Nagoya, Japan": [35.1815, 136.9066],
    "Bangalore, India": [12.9716, 77.5946],
    "Wuhan, China": [30.5928, 114.3055],
    "Tehran, Iran": [35.6892, 51.3890],
    "Hong Kong, China": [22.3193, 114.1694],
    "Chennai, India": [13.0827, 80.2707],
    "Taipei, Taiwan": [25.0320, 121.5654],
    "Johannesburg, South Africa": [-26.2041, 28.0473],
  }
  useEffect(() => {
    // temp of 3 cities
    axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${cities["Tokyo, Japan"][0]}&longitude=${cities["Tokyo, Japan"][1]}&hourly=temperature_2m,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=Asia%2FSingapore`)
    .then(response => {
      setL1(response.data);
    })
    .catch(error => {
      console.log(error);
    });
    axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${cities["New York, USA"][0]}&longitude=${cities["New York, USA"][1]}&hourly=temperature_2m,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=Asia%2FSingapore`)
    .then(response => {
      setL2(response.data);
    })
    .catch(error => {
      console.log(error);
    });
    axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${cities["London, UK"][0]}&longitude=${cities["London, UK"][1]}&hourly=temperature_2m,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=Asia%2FSingapore`)
    .then(response => {
      setL3(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }, []);
  useEffect(() => {
    if (l1 && l2 && l3) {
      setL4([l1, l2, l3]);
      setShowNumber(l1);
    }
  }, [l1, l2, l3]);
  return (
    <div className='cities-container'>
      { l4 ? (
      <div className='cities'>
        <div className="container">
          <div className="item" onClick={(event) => handleClick(event, 'Tokyo, Japan', l1)}>
            <div className='label'>Tokyo, Japan</div>
            <img className='weather-icon large' src={require(`./icons/${ICON_MAP.get(l1.current_weather.weathercode)}.svg`)} />
            <span data-current-temp>{l4[0].current_weather.temperature}</span>&deg;
          </div>

          <div className="item" onClick={(event) => handleClick(event, 'New York, USA', l2)}>
            <div className='label'>New York, USA</div>
            <img className='weather-icon large' src={require(`./icons/${ICON_MAP.get(l2.current_weather.weathercode)}.svg`)} />
            <span data-current-temp>{l4[1].current_weather.temperature}</span>&deg;
          </div>

          <div className="item" onClick={(event) => handleClick(event, 'London, UK', l3)}>
            <div className='label'>London, UK</div>
            <img className='weather-icon large' src={require(`./icons/${ICON_MAP.get(l3.current_weather.weathercode)}.svg`)} />
            <span data-current-temp>{l4[2].current_weather.temperature}</span>&deg;
          </div>
        </div>
        <div className='city-number'>
          <Clock lat={cities[city][0]} lon={cities[city][1]}/>
          <div className='box'>
            <div className='left-right'>
              <div className='left'>
                <img className='weather-icon-city' src={require(`./icons/${ICON_MAP.get(showNumber.current_weather.weathercode)}.svg`)} />
              </div>
                <div className='number-temperature'>
                    <span>55</span>&deg;
                </div>
            </div>
          </div>
          <div className='lower-items'>
            <div className='seven-title'>7 DAYS FORECAST</div>
            <div className="grid-container-columns">
              {showNumber.daily.time.map((item, index) => (
                <div className='grid-container-columns-item' key={index}>
                    <div className='label'>{item}</div>
                    <img className='weather-icon' src={require(`./icons/${ICON_MAP.get(showNumber.daily.weathercode[index])}.svg`)} />

                  <div className='days-temperature-highest'>
                    <div className='label'>Highest temp</div>
                    <span data-current-precipitation>{showNumber.daily.temperature_2m_max[index]}</span>&deg;
                  </div>

                  <div className='days-temperature-lowest'>
                    <div className='label'>Lowest temp</div>
                    <span data-current-humidity>{showNumber.daily.temperature_2m_min[index]}</span>&deg;
                  </div>
                </div>
          
              ))}
            </div>
          </div>
        </div>

    </div>
    ) : (
      <div>Loading...</div>
    )}
    </div>
  )
}

export default City