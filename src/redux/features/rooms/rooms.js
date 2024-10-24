import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const roomApi = createApi({
  reducerPath: "roomApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/",
  }),
  tagTypes: ["room"], 
  endpoints: (build) => ({

    getAllRoom: build.query({
      query: () => ({
        url: "/room",
      }),
      providesTags: ["room"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),

    getSingleRoom: build.query({
      query: (id) => ({
        url: `/room/${id}`,
      }),
      providesTags: ["room"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),

  
  }),
});

export const { useGetAllRoomQuery, useGetSingleRoomQuery } = roomApi;
