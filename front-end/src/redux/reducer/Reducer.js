import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URI from "../../components/Constant/BaseUrl";
const initialState = {
  weatherstate: [],
  isloading: false,
  error: false,
};
var token = sessionStorage.getItem("token");

export const weatherresult = createAsyncThunk(
  "content/weatherresult",
  async () => {
    const res = axios.get(`${BASE_URI}/api/user/view-saved-location`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    //       
    const Data=res.data
    console.log(res);
    return Data
  }
);

// export const weathersaveddata = createAsyncThunk(
//   "content/weathersaveddata",
//   async () => {
//     // const res =
//     // var locationdata = data.data.data;

//     console.log("location", weatherstate);
//     Promise.all(
//       weatherstate.map((location) => {
//         const res = axios.get(
//           `https://api.openweathermap.org/data/2.5/weather?&appid=92cfcf567578b9576ec31b2cdcda14a9&units=metric&q=${location.location}`
//         );
//       })
//     );

//     // const Data = await res.data.data;
//     // return Data;
//   }
// );

export const weatherSlice = createSlice({
  name: "content",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(weatherresult.pending, (state) => {
      state.isloading = true;
    });
    builder.addCase(weatherresult.fulfilled, (state, action) => {
      state.isloading = false;

      state.weatherstate = action.payload;
      console.log(action);
    });
    builder.addCase(weatherresult.rejected, (state, action) => {
      state.isloading = false;
      state.error = action.error.message;
      console.log(action.error.message);
    });

    ////////////////////////////////////

    // builder.addCase(weathersaveddata.pending, (state) => {
    //   state.isloading = true;
    // });
    // builder.addCase(weathersaveddata.fulfilled, (state, action) => {
    //   state.isloading = false;
    //   state.weatherstate = action.payload;
    //   // console.log(action);
    //   const newLocationList = weatherdata.map((response) => response.data);
    //   state.weatherstate = newLocationList;
    //   console.log(weatherstate);
    // });
    // builder.addCase(weathersaveddata.rejected, (state, action) => {
    //   state.isloading = false;
    //   state.error = action.error.message;
    // });
  },
});
export default weatherSlice.reducer;
