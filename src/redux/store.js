import { configureStore } from '@reduxjs/toolkit';
import cartReducer from "../redux/features/cart/cartSlice"
import booksApi from './features/books/books.api';
import bookReviewsApi from './features/book-reviews/book-reviews.api';

export default configureStore({
    reducer: {
        cart: cartReducer,
        [booksApi.reducerPath]: booksApi.reducer,
        [bookReviewsApi.reducerPath]: bookReviewsApi.reducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(booksApi.middleware, bookReviewsApi.middleware)

})