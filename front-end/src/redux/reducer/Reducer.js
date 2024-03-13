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
  async (data) => {
    const res = axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?&appid=92cfcf567578b9576ec31b2cdcda14a9&units=metric&lat=${data.lat}&lon=${data.lon}`
      )
      .then((response) => {
        console.log(response);
        // setResult(response.data);
        // setResultbody(true);
      })
      .catch((err) => {
        // alert("enter valid city name");
        console.log(err);
      });
    //       .
    const Data = await res.data.data;
    return Data;
  }
);
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
      state.weatherState = action.payload;
    });
    builder.addCase(weatherresult.rejected, (state, action) => {
      state.isloading = false;
      state.error = action.error.message;
    });
  },
});
export default weatherSlice.reducer;
