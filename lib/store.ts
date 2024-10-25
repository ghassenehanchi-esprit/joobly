import { configureStore } from '@reduxjs/toolkit';
import { jobSlice } from '@/lib/features/jobSlice/jobSlice';
import authSlice, { userSlice } from './features/authSlice/authSlice';

const store = configureStore({
  reducer: {
    job: jobSlice.reducer,
    user:userSlice.reducer
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export default store;