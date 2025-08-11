import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import schoolReducer from "./slices/schoolSlice";
// import academicReducer from "./slices/academicSlice";
// import financeReducer from "./slices/financeSlice";
// import communicationReducer from "./slices/communicationSlice";
// import libraryReducer from "./slices/librarySlice";
// import transportReducer from "./slices/transportSlice";
// import reportReducer from "./slices/reportSlice";
// import uiReducer from "./slices/uiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    school: schoolReducer,
    // academic: academicReducer,
    // finance: financeReducer,
    // communication: communicationReducer,
    // library: libraryReducer,
    // transport: transportReducer,
    // report: reportReducer,
    // ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
