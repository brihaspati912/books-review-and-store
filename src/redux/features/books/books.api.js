import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../../utilis/baseUrl';

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/books`, /*made an error here if you only type getBaseurl without() result will be http://localhost:5173/()%20=%3E%20%7B%20%20%20%20return%20%22http://localhost:5000/%22;%7D/api/books/ frontend + backend urls mixed you need to call the function*/
    credentials: 'include',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    }
})

const booksApi = createApi({
    reducerPath: 'booksApi',
    baseQuery: baseQuery,
    tagTypes: ['Books'],
    endpoints: (builder) => ({
        // 1.GET ALL BOOKS
        fetchAllBooks: builder.query({
            query: () => "/",
            providesTags: ['Books']

        }),
        // 2.GET ONE BOOK BY ID
        fetchBookById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: 'Books', id }],


        }),
        //3. ADD A NEW BOOK
        addBook: builder.mutation({
            query: (newBook) => ({
                url: `/create-book`,
                method: "POST",
                body: newBook,
            }),
            invalidatesTags: ['Books']

        }),

        //4. UPDATE A BOOK
        updateBook: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/edit/${id}`,
                method: "PUT",
                body: rest,
                headers: {
                    'Content-Type': 'application/json'
                }

            }),
            invalidatesTags: ['Books']

        }),

        //5. DELETE A BOOK
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `/delete/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Books']

        })



    }),

});
export const {
    useFetchAllBooksQuery,
    useFetchBookByIdQuery,
    useAddBookMutation,
    useUpdateBookMutation,
    useDeleteBookMutation,
} = booksApi;
export default booksApi;