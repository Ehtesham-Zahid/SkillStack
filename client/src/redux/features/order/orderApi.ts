import { apiSlice } from "@/src/redux/features/api/apiSlice";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrdersAdmin: builder.query<any, { page: number; limit: string }>({
      query: ({ page, limit }) => ({
        url: `/orders/get-all-orders-admin?page=${page}&limit=${limit}`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetAllOrdersAdminQuery } = orderApi;
