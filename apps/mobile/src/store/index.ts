import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';
import ordersReducer from './ordersSlice';
import drinksReducer from './drinksSlice';

// Persist configuration for drinks (cache drinks offline)
const drinksPersistConfig = {
  key: 'drinks',
  storage: AsyncStorage,
  whitelist: ['drinks'], // Only persist the drinks array, not loading/error states
};

// Persist configuration for orders (offline orders queue)
const ordersPersistConfig = {
  key: 'orders',
  storage: AsyncStorage,
};

// Create persisted reducers
const persistedDrinksReducer = persistReducer(drinksPersistConfig, drinksReducer);
const persistedOrdersReducer = persistReducer(ordersPersistConfig, ordersReducer);

// Combine reducers
const rootReducer = combineReducers({
  orders: persistedOrdersReducer,
  drinks: persistedDrinksReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
