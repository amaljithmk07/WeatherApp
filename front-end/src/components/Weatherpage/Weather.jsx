import React, { useEffect, useState } from "react";
import "./Weather.css";
import axios from "axios";
import BASE_URI from "../Constant/BaseUrl";
import Navbar from "../Navbar/Navbar";
import toast, { Toaster } from "react-hot-toast";

const Weather = () => {
  //Search Bar Inputs
  const [searchinput, setSearchinput] = useState({});

  //Display result body
  const [resultbody, setResultbody] = useState(false);

  //Main state for storing result
  const [result, setResult] = useState({
    main: [{}],
    weather: [{}],
  });

  const token = sessionStorage.getItem("token");
  //Search inputs
  const searchInputHandler = (e) => {
    setSearchinput(e.target.value);
  };

  //Search weather
  const searchWeather = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?&appid=92cfcf567578b9576ec31b2cdcda14a9&units=metric&q=${searchinput}`
      )
      .then((response) => {
        setResult(response.data);
        setResultbody(true);
        toast.success("Data Retrieved successfull", {
          position: "bottom-center",
        });
      })
      .catch((err) => {
        console.log("err");
        alert("enter valid city name");
      });
  };

  // Fetching Current  weather location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?&appid=92cfcf567578b9576ec31b2cdcda14a9&units=metric&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
          )
          .then((response) => {
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

  // location Save
  const saveLocation = (e) => {
    const location = [result.name];
    console.log(location);
    axios
      .post(`${BASE_URI}/api/user/save-location`, location, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log(data);
        toast.success("Location Saved Successful", {
          position: "bottom-center",
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Location Already saved", {
          position: "bottom-center",
        });
      });
  };

  return (
    <div>
      <Navbar />
      <Toaster />
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
                      <>
                        {result.weather[0]?.main == "Haze" ? (
                          <>
                            <img
                              src="/haze.png"
                              alt=""
                              className="result-icon"
                            />
                          </>
                        ) : (
                          <>
                            {result.weather[0]?.main == "Sunny" ? (
                              <>
                                <img
                                  src="/sunny.png"
                                  alt=""
                                  className="result-icon"
                                />
                              </>
                            ) : (
                              <>
                                {result.weather[0]?.main == "Wind" ? (
                                  <>
                                    <img
                                      src="/wind.png"
                                      alt=""
                                      className="result-icon"
                                    />
                                  </>
                                ) : (
                                  <>
                                    {result.weather[0]?.main == "Storm" ? (
                                      <>
                                        <img
                                          src="/storm.png"
                                          alt=""
                                          className="result-icon"
                                        />
                                      </>
                                    ) : (
                                      <>
                                        {result.weather[0]?.main == "Fog" ? (
                                          <>
                                            <img
                                              src="/fog.png"
                                              alt=""
                                              className="result-icon"
                                            />
                                          </>
                                        ) : (
                                          <></>
                                        )}
                                      </>
                                    )}
                                  </>
                                )}
                              </>
                            )}
                          </>
                        )}
                      </>
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
                className="weather-humidity-img"
              />{" "}
            </div>
            <div className="weather-save-sec">
              <img
                src="/unsaved.png"
                alt=""
                className="weather-save-icon"
                onClick={saveLocation}
              />
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
