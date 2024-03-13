import React, { useEffect, useState } from "react";
import "./Savedlocation.css";
import axios from "axios";
import BASE_URI from "../Constant/BaseUrl";
import Navbar from "../Navbar/Navbar";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { weatherresult } from "../../redux/reducer/Reducer";

const Demo = () => {
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



  console.log(locationlist);
  return (
    <div>
      <Navbar />
      <Toaster />
      <div className="saved-main-body">
        {locationlist.map((data) => (
          <div className="saved-sub-body" key={data}>
            {data.weather[0]?.main == "Clouds" ? (
              <>
                <img src="/cloudy.png" alt="" className="result-icon" />
              </>
            ) : (
              <>
                {data.weather[0]?.main == "Rain" ? (
                  <>
                    <img src="/rainy.png" alt="" className="result-icon" />
                  </>
                ) : (
                  <>
                    {data.weather[0]?.main == "Clear" ? (
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

            <div className="saved-data"> {data.name}</div>
            <div className="saved-data"> {data.main?.temp}</div>
            <div className="saved-data"> {data.main?.humidity}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Demo;
