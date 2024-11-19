import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './feature/cart/cartSlice'
import booksApi from './feature/books/booksApi';
import ordersApi from './feature/orders/ordersApi';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(booksApi.middleware, ordersApi.middleware),
})