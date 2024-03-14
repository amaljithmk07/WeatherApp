import React, { useEffect, useState } from "react";
import "./Savedlocation.css";
import axios from "axios";
import BASE_URI from "../Constant/BaseUrl";
import Navbar from "../Navbar/Navbar";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { weatherresult } from "../../redux/reducer/Reducer";

const Savedlocation = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const [result, setResult] = useState([]);
  const [locationlist, setLocationlist] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URI}/api/user/view-saved-location`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        var locationdata = data.data.data;
        Promise.all(
          locationdata.map((location) =>
            axios.get(
              `https://api.openweathermap.org/data/2.5/weather?&appid=92cfcf567578b9576ec31b2cdcda14a9&units=metric&q=${location.location}`
            )
          )
        )
          .then((weatherResponses) => {
            const newLocationList = weatherResponses.map(
              (response) => response.data
            );
            setLocationlist(newLocationList);
          })
          .catch((err) => {
            console.log(err);
            // alert("enter valid city name");
          });
      })
      .catch((err) => {
        console.log(err.response.status);
        if (err.response.status == 401) {
          toast.error("Auth Failed", {
            position: "bottom-center",
          });
          setTimeout(() => {
            sessionStorage.clear();
            navigate("/");
          }, 2000);
        }
      });
  }, []);

  //   const dispatch=useDispatch()
  //   const weather=useSelector((state)=>state.weather.weatherstate)
  // // console.log('weather',weather);

  //   useEffect(()=>{
  //     dispatch(weatherresult())
  //   },[])

  //////Delete Location

  const locationDelete = (name) => {
    axios
      .get(`${BASE_URI}/api/user/delete-location/${name}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then((data) => {
        console.log(data);
        const filterData = locationlist.filter((data) => {
          return data.name != name;
        });
        setLocationlist(filterData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(locationlist);
  return (
    <div>
      <Navbar />
      <Toaster />
      <div className="saved-main-body">
        {locationlist.length != 0 ? (
          <>
            {locationlist.map((data) => (
              <div className="saved-sub-body" key={data}>
                <div className="saved-data-delete">
                  <img
                    src="/delete.png"
                    alt=""
                    className="saved-delete-btn"
                    onClick={() => locationDelete(data.name)}
                  />
                </div>
                {data.weather[0]?.main == "Clouds" ? (
                  <>
                    <img
                      src="/cloudy.png"
                      alt=""
                      className="saved-result-icon"
                    />
                  </>
                ) : (
                  <>
                    {data.weather[0]?.main == "Rain" ? (
                      <>
                        <img
                          src="/rainy.png"
                          alt=""
                          className="saved-result-icon"
                        />
                      </>
                    ) : (
                      <>
                        {data.weather[0]?.main == "Clear" ? (
                          <>
                            <img
                              src="/sun.png"
                              alt=""
                              className="saved-result-icon"
                            />
                          </>
                        ) : (
                          <>
                            {data.weather[0]?.main == "Haze" ? (
                              <>
                                <img
                                  src="/haze.png"
                                  alt=""
                                  className="saved-result-icon"
                                />
                              </>
                            ) : (
                              <>
                                {data.weather[0]?.main == "Sunny" ? (
                                  <>
                                    <img
                                      src="/sunny.png"
                                      alt=""
                                      className="saved-result-icon"
                                    />
                                  </>
                                ) : (
                                  <>
                                    {data.weather[0]?.main == "Wind" ? (
                                      <>
                                        <img
                                          src="/wind.png"
                                          alt=""
                                          className="saved-result-icon"
                                        />
                                      </>
                                    ) : (
                                      <>
                                        {data.weather[0]?.main == "Storm" ? (
                                          <>
                                            <img
                                              src="/storm.png"
                                              alt=""
                                              className="saved-result-icon"
                                            />
                                          </>
                                        ) : (
                                          <>
                                            {data.weather[0]?.main == "Fog" ? (
                                              <>
                                                <img
                                                  src="/fog.png"
                                                  alt=""
                                                  className="saved-result-icon"
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

                <div className="saved-data"> {data.name}</div>
                <div className="saved-data"> {data.main?.temp} &deg;C</div>
                <div className="saved-data">
                  {" "}
                  {data.main?.humidity}{" "}
                  <img
                    src="/humidity.png"
                    alt=""
                    className="saved-humidity-img"
                  />{" "}
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="saved-no-data-sec">
              NO DATA FOUND
              <img src="/no-data.png" alt="" className="saved-no-data-img" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Savedlocation;
