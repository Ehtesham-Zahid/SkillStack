import { apiSlice } from "@/src/redux/features/api/apiSlice";

export const analyticsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsersAnalytics: builder.query<any, void>({
      query: () => ({
        url: `/analytics/get-users-analytics`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getCoursesAnalytics: builder.query<any, void>({
      query: () => ({
        url: `/analytics/get-courses-analytics`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getOrdersAnalytics: builder.query<any, void>({
      query: () => ({
        url: `/analytics/get-orders-analytics`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetUsersAnalyticsQuery,
  useGetCoursesAnalyticsQuery,
  useGetOrdersAnalyticsQuery,
} = analyticsApi;
