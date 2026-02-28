import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "../features/auth/authSlice";
import logReducer from "../features/log/logSlice";
import internshipReducer from "../features/internship/internshipSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    logs: logReducer,
    internships: internshipReducer,
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
