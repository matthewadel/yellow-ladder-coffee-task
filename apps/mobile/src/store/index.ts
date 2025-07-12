import { configureStore } from '@reduxjs/toolkit';
import ordersReducer from './ordersSlice';
import drinksReducer from './drinksSlice';

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
    drinks: drinksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
