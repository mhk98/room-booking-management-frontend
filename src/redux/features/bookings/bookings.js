import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://room-booking-management-backend.onrender.com/api/v1/",
  }),
  tagTypes: ["booking"], 
  endpoints: (build) => ({

    createBooking: build.mutation({
      query: ({data, userId, roomId}) => ({
        url: `/booking/create/${userId}/${roomId}`,
        method: "POST",
        body: data,
      }),
  invalidatesTags: ["auth"], 

    }),
    getAllBooking: build.query({
      query: () => ({
        url: "/booking",
      }),
      providesTags: ["booking"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),

    getSingleBooking: build.query({
      query: (id) => ({
        url: `/booking/${id}`,
      }),
      providesTags: ["booking"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),

  
  }),
});

export const { useCreateBookingMutation, useGetAllBookingQuery, useGetSingleBookingQuery } = bookingApi;
