import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface UiStates {
  isSideBarCollapsed: boolean;
}

const initialState = <UiStates>{
  isSideBarCollapsed: true,
};

const uiSlice = createSlice({
  name: "uiSlice",
  initialState,
  reducers: {
    closeSideBar: (state) => {
      state.isSideBarCollapsed = true;
    },
    openSideBar: (state) => {
      state.isSideBarCollapsed = false;
    },
  },
});

export const { closeSideBar, openSideBar } = uiSlice.actions;

export const sideBarCollapsed = (state: RootState) =>
  state.Ui.isSideBarCollapsed;

export default uiSlice.reducer;
