import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  isUpdate: 0,
};

const updateSlice = createSlice({
  name: "Update",
  initialState: INITIAL_STATE,
  reducers: {
    updateState: (state, action) => {
      return { ...state, isUpdate: action.payload };
    },
  },
});

export const { updateState } = updateSlice.actions;
export default updateSlice.reducer;
