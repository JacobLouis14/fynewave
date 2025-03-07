import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import { setupListeners } from "@reduxjs/toolkit/query";
import uiSlice from "./fetures/uiSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      Ui: uiSlice,
      [api.reducerPath]: api.reducer,
    },
    // only for caching
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });
};
setupListeners(makeStore().dispatch);

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
