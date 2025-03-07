import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface AppUiState {
  isNewsletterSubscribeModalOpen: boolean;
  isScrolledToHomeInLandingPage: boolean;
}

const initialState: AppUiState = {
  isNewsletterSubscribeModalOpen: false,
  isScrolledToHomeInLandingPage: false,
};

export const appUiSlice = createSlice({
  name: "appUi",
  initialState,
  reducers: {
    newsletterSubscribeModalOpenHandler: (state): void => {
      state.isNewsletterSubscribeModalOpen = true;
    },
    newsletterSubscribeModalCloseHandler: (state): void => {
      state.isNewsletterSubscribeModalOpen = false;
    },
    scrolledToHomeInLandingPage: (state): void => {
      state.isScrolledToHomeInLandingPage = true;
    },
  },
});

export const {
  newsletterSubscribeModalCloseHandler,
  newsletterSubscribeModalOpenHandler,
  scrolledToHomeInLandingPage,
} = appUiSlice.actions;

// state exporting from here
export const newsletterSubscribeModalisOpen = (state: RootState) =>
  state.appUi.isNewsletterSubscribeModalOpen;
export const isScrolledToHomeInLandingPageState = (state: RootState) =>
  state.appUi.isScrolledToHomeInLandingPage;

export default appUiSlice.reducer;
