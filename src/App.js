import React, { useState } from "react";
import "./app.css";

export default function App() {
  // Define state variables for city and weather data
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState({
    city: "",
    country: "",
    temprature: "",
    temp_min: "",
    temp_max: "",
    weather: "",
    humidity: "",
    pressure: "",
    sunrise: "",
    sunset: "",
    wind_speed: "",
    temp_rain: "",
  });

  // Define a function to handle the search input
  const handleSearch = (e) => {
    setCity(e.target.value);
  };

  // Define a function to handle the search button
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
            setTemp({
              city: data.name,
              country: data.sys.country,
              temprature: data.main.temp,
              temp_min: data.main.temp_min,
              temp_max: data.main.temp_max,

              weather: data.weather[0].main,
              humidity: data.main.humidity,
              pressure: data.main.pressure,
              sunrise: data.sys.sunrise,
              sunset: data.sys.sunset,
              wind_speed: data.wind.speed,
              temp_rain: data.clouds.all,
            });
          });
      });
  };

  const handleDate = () => {
    let date = new Date();
    let day = date.getDay();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();

    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let dayName = days[day];

    let time = `${hour}:${min}:${sec}`;
    var dateName = `${dayName} ${time}`;
    return dateName;
  };

  //convert sunrise unix to 12 hour formate
  const handleSunrise = () => {
    let date = new Date(temp.sunrise * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let amOrPm = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // "0" should be "12"
    minutes = minutes < 10 ? "0" + minutes : minutes;

    // Return the formatted time
    return hours + ":" + minutes + " " + amOrPm;
  };

  //convert sunset unix to 12 hour formate
  const handleSunset = () => {
    let date = new Date(temp.sunset * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let amOrPm = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // "0" should be "12"
    minutes = minutes < 10 ? "0" + minutes : minutes;

    // Return the formatted time
    return hours + ":" + minutes + " " + amOrPm;
  };

  //convert temprature from kelvin to celcius
  const handleTemp = () => {
    let degree = temp.temprature - 273.15;
    return degree.toFixed(1);
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
              <div className="date_time">{handleDate()}</div>
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
                <span>
                  {temp.city}, {temp.country}
                </span>
              </div>
            </div>

            <div className="weather_temperature">
              <div className="temperature">
                <div className="temp">
                  {handleTemp()}

                  <span>°C</span>
                </div>
                <div className="current_situation">
                  <span>{temp.weather}</span>
                </div>
              </div>
            </div>

            {/* <div className="weather_range">
              <div className="range">
                <div className="min">
                  <svg
                    height="24"
                    width="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 5V19M12 19L6 13M12 19L18 13"
                      stroke="#131A29"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                  <span>Night</span>
                  <span>{temp.temp_min}</span>
                </div>
                <div className="max">
                  <svg
                    height="24"
                    width="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 5V19M12 5L6 11M12 5L18 11"
                      stroke="#131A29"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                  <span>Day</span>
                  <span>22°</span>
                </div>
              </div>
            </div> */}

            <div className="weather_details">
              <div className="sunrise">
                <svg
                  height="24"
                  width="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 10V3M12 3L9 6M12 3L15 6M6 12L5 11M18 12L19 11M3 18H21M5 21H19M7 18C7 15.2386 9.23858 13 12 13C14.7614 13 17 15.2386 17 18"
                    stroke="#131A29"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
                <span>{handleSunrise()}</span>
                <span
                  style={{
                    color: "#ffffff",
                    fontSize: "12px",
                    fontWeight: "400",
                  }}
                >
                  Sunrise
                </span>
              </div>
              <div className="humidity">
                <svg
                  height="24"
                  width="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 13.8C19 17.7764 15.866 21 12 21C8.13401 21 5 17.7764 5 13.8C5 12.8452 5.18069 11.9338 5.50883 11.1C6.54726 8.46135 12 3 12 3C12 3 17.4527 8.46135 18.4912 11.1C18.8193 11.9338 19 12.8452 19 13.8Z"
                    stroke="#131A29"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
                <span>{temp.humidity}%</span>
              </div>
              <div className="wind">
                <svg
                  height="24"
                  width="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.7639 7C16.3132 6.38625 17.1115 6 18 6C19.6569 6 21 7.34315 21 9C21 10.6569 19.6569 12 18 12H3M8.50926 4.66667C8.87548 4.2575 9.40767 4 10 4C11.1046 4 12 4.89543 12 6C12 7.10457 11.1046 8 10 8H3M11.5093 19.3333C11.8755 19.7425 12.4077 20 13 20C14.1046 20 15 19.1046 15 18C15 16.8954 14.1046 16 13 16H3"
                    stroke="#131A29"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
                <span>{temp.wind_speed} Km/H</span>
              </div>
              <div className="rain">
                <svg
                  height="24"
                  width="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.5 21L12 18M14.5 21L16 18M6.5 21L8 18M8.8 15C6.14903 15 4 12.9466 4 10.4137C4 8.31435 5.6 6.375 8 6C8.75283 4.27403 10.5346 3 12.6127 3C15.2747 3 17.4504 4.99072 17.6 7.5C19.0127 8.09561 20 9.55741 20 11.1402C20 13.2719 18.2091 15 16 15L8.8 15Z"
                    stroke="#131A29"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
                <span>{temp.temp_rain}</span>
              </div>
              <div className="sunset">
                <svg
                  height="24"
                  width="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 12L5 11M18 12L19 11M3 18H21M5 21H19M7 18C7 15.2386 9.23858 13 12 13C14.7614 13 17 15.2386 17 18M12 3V10M12 10L15 7M12 10L9 7"
                    stroke="#131A29"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
                <span>{handleSunset()}</span>
                <span
                  style={{
                    color: "#ffffff",
                    fontSize: "12px",
                    fontWeight: "400",
                  }}
                >
                  Sunset
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
