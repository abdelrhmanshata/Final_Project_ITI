import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  video: {},
};

const videoSlice = createSlice({
  name: "video",
  initialState: INITIAL_STATE,
  reducers: {
    selectVideo: (state, action) => {
      return { ...state, video: action.payload };
    },
  },
});

export const { selectVideo } = videoSlice.actions;
export default videoSlice.reducer;
