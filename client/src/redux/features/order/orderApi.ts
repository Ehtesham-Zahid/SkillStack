import { apiSlice } from "@/src/redux/features/api/apiSlice";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrdersAdmin: builder.query<any, { page: number; limit: string }>({
      query: ({ page, limit }) => ({
        url: `/orders/get-all-orders-admin?page=${page}&limit=${limit}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Orders"] as any,
    }),
    getStripePublishableKey: builder.query<any, void>({
      query: () => ({
        url: `/orders/get-stripe-publishable-key`,
        method: "GET",
        credentials: "include",
      }),
    }),
    newPayment: builder.mutation<any, { amount: number }>({
      query: ({ amount }) => ({
        url: `/orders/new-payment`,
        method: "POST",
        body: { amount },
        credentials: "include",
      }),
    }),
    createOrder: builder.mutation<any, { courseId: string; paymentInfo: any }>({
      query: ({ courseId, paymentInfo }) => ({
        url: `/orders/create-order`,
        method: "POST",
        body: { courseId, payment_info: paymentInfo },
        credentials: "include",
      }),
      invalidatesTags: ["Orders"] as any,
    }),
  }),
});

export const {
  useGetAllOrdersAdminQuery,
  useGetStripePublishableKeyQuery,
  useNewPaymentMutation,
  useCreateOrderMutation,
} = orderApi;
