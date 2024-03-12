import React, { useEffect, useState } from "react";
import "./Weather.css";
import axios from "axios";

const Weather = () => {
  const [searchinput, setSearchinput] = useState({}); //Search Bar Inputs

  const [resultbody, setResultbody] = useState(false); //Display result body
  const [result, setResult] = useState({
    main: [{}],
    weather: [{}],
  }); //Search Bar Inputs

  //Search inputs
  const searchInputHandler = (e) => {
    setSearchinput(e.target.value);
  };
  // console.log(searchinput);

  //Search weather
  const searchWeather = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?&appid=92cfcf567578b9576ec31b2cdcda14a9&units=metric&q=${searchinput}`
      )
      .then((response) => {
        // console.log(response.data);
        setResult(response.data);
        setResultbody(true);
      })
      .catch((err) => {
        console.log("err");
        alert("enter valid city name");
      });
  };

  //Fetching Current location weather

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?&appid=92cfcf567578b9576ec31b2cdcda14a9&units=metric&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
          )
          .then((response) => {
            // console.log(response.data);
            setResult(response.data);
            setResultbody(true);
          })
          .catch((err) => {
            alert("enter valid city name");
            console.log("err");
          });
      });
    }
  }, []);

  return (
    <div>
      <div className="weather-main-body">
        <div className="weather-sub-body">
          <form action="" className="weather-search-area">
            <input
              type="text"
              className="weather-search-bar"
              onChange={searchInputHandler}
              placeholder="Enter city name"
              name="place"
            />
            <img
              src="search.png"
              alt=""
              className="weather-search-icon"
              onClick={searchWeather}
            />
          </form>
        </div>
        {resultbody == true ? (
          <div className="weather-result-body">
            {result.weather[0]?.main == "Clouds" ? (
              <>
                <img src="/cloudy.png" alt="" className="result-icon" />
              </>
            ) : (
              <>
                {result.weather[0]?.main == "Rain" ? (
                  <>
                    <img src="/rainy.png" alt="" className="result-icon" />
                  </>
                ) : (
                  <>
                    {result.weather[0]?.main == "Clear" ? (
                      <>
                        <img src="/sun.png" alt="" className="result-icon" />
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </>
            )}

            <div className="weather-data">{result.name}</div>
            <div className="weather-data">
              {" "}
              {result.main.temp ? <>{result.main?.temp}&deg; C</> : <></>}
            </div>
            <div className="weather-data"> {result.weather[0]?.main}</div>
            <div className="weather-data">
              {result.main?.humidity}
              <img
                src="/humidity.png"
                alt=""
                className="result-humidity"
              />{" "}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Weather;
