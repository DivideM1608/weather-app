import React, { Component } from 'react'
import sun from './icons/cloud.svg'
import clear from '../pages/image/about_civil_clear.png'
import 'chart.js/auto'
import LineChart from '../components/LineChart'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ICON_MAP } from './icons/iconMap'
import cloudsun from './icons/cloud-sun.svg'
import moment from 'moment';
import Map from '../components/Map'
import SearchBar from '../components/SearchBar'
import Clock from '../components/Clock'
import 'leaflet/dist/leaflet.css'

function Home() {
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

  const [data, setData] = useState(null);
  const [userTime, setUserTime] = useState(null);
  const [now, setNow] = useState(null);
  const [futureTimes, setFutureTimes] = useState([]);
  const [nextThreeWeatherCodes, setNextThreeWeatherCodes] = useState([]);
  const [nextThreeTemp, setNextThreeTemp] = useState([]);


  const [location, setLocation] = useState(null);
  
  useEffect(() => {
    const now = new Date();
    console.log(now);
    setNow(now);
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();
    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    const formattedDate = `${day}/${month}/${year} ${hour}:${minute}`;
    console.log(formattedDate); // output: "26/03/2023 08:10"


    const utcOffset = now.getTimezoneOffset() * 60 * 1000;
    const userTime = new Date(now.getTime() - utcOffset).toLocaleString();
    console.log(userTime)
    console.log(moment(userTime.toLocaleString).format("DD/MM/YYYY HH:mm"))
    setUserTime(userTime);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation(position.coords);
      }, (error) => {
        console.log(error);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);


  useEffect(() => {
    console.log(location);
    if (location) {
      const lat = location.latitude;
      const lon = location.longitude;
      axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum&current_weather=true&timezone=Asia%2FSingapore`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    }
  }, [location]);

  useEffect(() => {
    if (data) {
      console.log(data);
      console.log(data.current_weather.weathercode);
      console.log(`./icons/${ICON_MAP.get(data.current_weather.weathercode)}.svg`);
      console.log(userTime)
      filterDate(data.hourly, now);
    }
  }, [data]);

  const formatHours = (time) => {
    const datetime = new Date(time);
    const hours = datetime.getHours();
    return hours;
  }

  const filterDate = (json, now) => {
    const times = json.time.map(time => new Date(time));
    const fut = times.filter(time => time > now).slice(0, 7);
    console.log(fut);
    const nextThreeWeatherCodes = fut.map(dateTime => {
      const index = times.findIndex(apiDateTime => apiDateTime === dateTime);
      return json.weathercode[index];
    });
    const nextThreeTemp = fut.map(dateTime => {
      const index = times.findIndex(apiDateTime => apiDateTime === dateTime);
      return json.temperature_2m[index];
    });
    setFutureTimes(fut);
    setNextThreeWeatherCodes(nextThreeWeatherCodes);
    setNextThreeTemp(nextThreeTemp);
  }
  
  return (
    <div className='row-page'>
      <div>
        {data ? ( 
            <div>
              <div>
                {userTime && (
                <div className='center-right'>
                  <div className='center-items'>
                    <div>
                      <p>User location time:</p>
                      <Clock lat={location.latitude} lon={location.longitude}/>
                    </div>

                    <div className='map-weather'>
                      <div className='map'>
                        <div class='map-inner'>
                          <Map lat={location.latitude} lon={location.longitude}/>
                        </div>
                      </div>
                      <div className="hours-weather">
                        <div className='hours-weather-inner'>
                          <p>Weather for the next 7 hours</p>
                          <div class="table">
                            <div class="row">
                              <div class="cell">Time</div>
                              <div class="cell">Weather</div>
                              <div class="cell">Tempperature</div>
                            </div>
                            {futureTimes.map((item, index) => (
                            <div class="row">
                              <div class="cell">{moment(item).format("DD/MM/YYYY HH:mm")}</div>
                              <div class="cell">
                                <div>
                                  <img className='weather-icon' src={require(`./icons/${ICON_MAP.get(nextThreeWeatherCodes[index])}.svg`)} />
                                </div>
                              </div>
                              <div class="cell">{nextThreeTemp[index]}</div>
                            </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='table-days'>
                    <p>Weather for the next 7 days</p>
                    <table>
                      <tr>
                        <td>Date</td>
                        <td>Weather</td>
                        <td>High</td>
                        <td>Low</td>
                      </tr>
                      {data.daily.time.map((item, index) => (
                      <tr>
                        <td>{item}</td>
                        <td>
                          <div className='days-weather-icon'>
                            <img className='weather-icon' src={require(`./icons/${ICON_MAP.get(data.daily.weathercode[index])}.svg`)} />
                          </div>
                        </td>
                        <td>{data.daily.temperature_2m_max[index]}</td>
                        <td>{data.daily.temperature_2m_min[index]}</td>
                      </tr>
                      ))}
                    </table>
                  </div>
                </div>  
                )}
              </div>
          </div>
          ) : (
            <p>Can't find data.</p>
        )}
      </div>
    </div>

  )
}

export default Home