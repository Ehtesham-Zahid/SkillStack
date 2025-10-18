import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../auth/authSlice";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_SERVER_URL }),
  tagTypes: [
    "Users",
    "Courses",
    "Layout",
    "Course",
    "Orders",
    "Notifications",
    "User",
  ],
  endpoints: (builder) => ({
    loadUser: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["User"] as any,
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          console.log("loadUser");

          const result = await queryFulfilled;
          console.log(result.data);
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

export const { useLoadUserQuery } = apiSlice;
