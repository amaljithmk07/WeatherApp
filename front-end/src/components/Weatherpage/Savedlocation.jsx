import React, { useEffect, useState } from "react";
import "./Savedlocation.css";
import axios from "axios";
import BASE_URI from "../Constant/BaseUrl";

const Savedlocation = () => {
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
        // setResult(data.data.data);
        var locationdata = data.data.data;
        console.log(locationdata);

        for (const i of locationdata) {
          console.log(i.location);
          axios
            .get(
              `https://api.openweathermap.org/data/2.5/weather?&appid=92cfcf567578b9576ec31b2cdcda14a9&units=metric&q=${i.location}`
            )
            .then((response) => {
              //   console.log(response);
              setLocationlist([...locationlist, response]);
            })
            .catch((err) => {
              console.log(err);
              // alert("enter valid city name");
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(locationlist);
  return (
    <div>
      <div className="saved-main-body">
        {locationlist.map((data) => (
          <div className="saved-sub-body" key={data._id}>
            {data.name}sds
          </div>
        ))}
      </div>
    </div>
  );
};

export default Savedlocation;
