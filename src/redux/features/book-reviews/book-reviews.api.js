import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../../utilis/baseUrl';

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/book-reviews`, /*made an error here if youonly type getBaseurl without() result will be http://localhost:5173/()%20=%3E%20%7B%20%20%20%20return%20%22http://localhost:5000/%22;%7D/api/books/ frontend + backend urls mixed you need to call the function*/
    credentials: 'include',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            headers.set("Autorization", `Bearer ${token}`);
        }
        return headers;
    }
})

const bookReviewsApi = createApi({
    reducerPath: 'bookReviewsApi',
    baseQuery: baseQuery,
    tagTypes: ['BookReviews'],
    endpoints: (builder) => ({
        // 1.GET ALL BOOKS
        fetchAllBookReviews: builder.query({
            query: () => "/",
            providesTags: ['BookReviews']

        }),
        // 2.GET ONE BOOK BY ID
        fetchBookReviewById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: 'BookReviews', id }]
        }),
        //3. ADD A NEW BOOK
        addBookReview: builder.mutation({
            query: (newBookReview) => ({
                url: `/create-bookreview`,
                method: "POST",
                body: newBookReview,
            }),
            invalidatesTags: ['BookReviews']

        }),

        //4. UPDATE A BOOK REVIEW
        updateBookReview: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/edit/${id}`,
                method: "PUT",
                body: rest,
                headers: {
                    'Content-Type': 'application/json'
                }

            }),
            invalidatesTags: ['BookReviews']

        }),

        //5. DELETE A BOOK
        deleteBookReview: builder.mutation({
            query: (id) => ({
                url: `/delete/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Books']

        })



    }),

});

export const { useFetchAllBookReviewsQuery, fetchAllBookReviews, fetchBookReviewById, addBookReview, updateBookReview, deleteBookReview } = bookReviewsApi;
export default bookReviewsApi;