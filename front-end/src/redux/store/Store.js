import { configureStore } from "@reduxjs/toolkit";
import weatherSlice  from "../reducer/Reducer";
export default configureStore({
  reducer: {
    weather: weatherSlice,
  },
});
