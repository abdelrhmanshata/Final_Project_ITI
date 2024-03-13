import { configureStore } from "@reduxjs/toolkit";
import videoSlice from "./slices/video";

export default configureStore({
  reducer: {
    video: videoSlice,
  },
});

// configureStore => reducer
// Slice => name, initialState, reducers
// reducers => function => state, action => update state
// from slice => export const {ReducerFunctions} = slice.actions => component
// from slice => export default slice.reducer => configureStore
