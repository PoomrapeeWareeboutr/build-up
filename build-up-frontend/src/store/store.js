import { configureStore } from '@reduxjs/toolkit';
import shoppingCartReducer from './state_slices/shopping-cart-slice';
import { apiSlice } from './state_slices/api-slice';

export default configureStore({
  reducer: {
    shoppingCart: shoppingCartReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
