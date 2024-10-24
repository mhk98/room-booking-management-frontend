import { configureStore } from '@reduxjs/toolkit'
import { roomApi } from '../features/rooms/rooms'
import { authApi } from '../features/auth/auth'
import { bookingApi } from '../features/bookings/bookings'

export const store = configureStore({
  reducer: {
    [roomApi.reducerPath]: roomApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      roomApi.middleware,
      authApi.middleware,  // Corrected here
      bookingApi.middleware // Corrected here
    ),
});
