import React, { useState } from "react";
import "./app.css";

export default function App() {
  const [city, setCity] = useState("");

  const handleSearch = (e) => {
    setCity(e.target.value);
  };

  const handleMoreDetails = () => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=9882d8ef2f6a3ed4438993d9eb443d03`
    )
      .then((res) => res.json())
      .then((data) => {
        const lat = data[0].lat;
        const lon = data[0].lon;
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9882d8ef2f6a3ed4438993d9eb443d03` //&units=metric
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });
      });
  };

  return (
    <>
      <div className="wrapper">
        <div className="container">
          <div className="searchbox">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z" />
            </svg>
            <input
              type="text"
              name="search"
              placeholder="Search cities"
              onChange={handleSearch}
            />
            <button onClick={handleMoreDetails}>Search</button>
          </div>

          <div className="weather_card">
            <div className="location_details">
              <div className="date_time">Saturday 08:52 PM</div>
              <div className="location">
                <svg
                  height="24"
                  width="24"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>ionicons-v5-n</title>
                  <circle cx="256" cy="192" r="32" />
                  <path d="M256,32C167.78,32,96,100.65,96,185c0,40.17,18.31,93.59,54.42,158.78,29,52.34,62.55,99.67,80,123.22a31.75,31.75,0,0,0,51.22,0c17.42-23.55,51-70.88,80-123.22C397.69,278.61,416,225.19,416,185,416,100.65,344.22,32,256,32Zm0,224a64,64,0,1,1,64-64A64.07,64.07,0,0,1,256,256Z" />
                </svg>
                <span>Jodhpur, India</span>
              </div>
            </div>

            <div className="weather_temperature">
              <div className="temperature">
                <div className="temp">
                  20<span>°C</span>
                  <div className="current_situtation">
                    <span>Cloudy</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="weather_range">
              <div className="range">
                <div className="min">
                  <span>Min</span>
                  <span>18°</span>
                </div>
                <div className="max">
                  <span>Max</span>
                  <span>22°</span>
                </div>
              </div>
            </div>

            <div className="weather_details">
              <div className="details">
                <div className="sunrise">
                  <span>svg</span>
                  <span>time</span>
                </div>
                <div className="humidity">
                  <span>Humidity</span>
                  <span>50%</span>
                </div>
                <div className="wind">
                  <span>Wind</span>
                  <span>5km/h</span>
                </div>
                <div className="pressure">
                  <span>Pressure</span>
                  <span>1000mb</span>
                </div>
                <div className="sunset">
                  <span>svg</span>
                  <span>time</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
