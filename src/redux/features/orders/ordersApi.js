import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utilis/baseUrl"; //must not use {} because it is default export
const ordersApi = createApi({
    reducerPath: "ordersApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/orders/`,
        credentials: "include"
    }),
    tagTypes: ["Orders"],
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (newOrder) => ({
                url: "/create-order",
                method: "POST",
                body: newOrder,
                credentials: "include",
            })
        }),
        getOrdersByEmail: builder.query({
            query: (email) => ({
                url: `/email/${email}`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["Orders"]
        })
    })
})


export const { useCreateOrderMutation, useGetOrdersByEmailQuery } = ordersApi;
export default ordersApi;