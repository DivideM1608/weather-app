import React, { useState } from "react";

function SearchBar() {
  const [searchValue, setSearchValue] = useState("");

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


  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Search value:", searchValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={searchValue} onChange={handleChange} />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;