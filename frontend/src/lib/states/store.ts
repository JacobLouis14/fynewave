import { configureStore } from "@reduxjs/toolkit";
import appUiSlice from "./features/appUiSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      appUi: appUiSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
