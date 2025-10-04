import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../auth/authSlice";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_SERVER_URL }),
  tagTypes: ["Users", "Courses"],
  endpoints: (builder) => ({
    refreshToken: builder.query({
      query: () => ({
        url: "/users/update-access-token",
        method: "GET",
        credentials: "include",
      }),
    }),
    loadUser: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              user: result.data.user,
              token: result.data.accessToken,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useRefreshTokenQuery, useLoadUserQuery } = apiSlice;
