import { apiSlice } from "@/src/redux/features/api/apiSlice";

export const notificationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotifications: builder.query<any, void>({
      query: () => ({
        url: `/notifications/get-all-notifications`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Notifications"] as any,
    }),

    updateNotificationStatus: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `/notifications/update-notification-status/${id}`,
        method: "PUT",
        credentials: "include",
      }),
      invalidatesTags: ["Notifications"] as any,
    }),
  }),
});

export const {
  useGetAllNotificationsQuery,
  useUpdateNotificationStatusMutation,
} = notificationApi;
