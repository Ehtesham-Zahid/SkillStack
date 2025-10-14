import { apiSlice } from "@/src/redux/features/api/apiSlice";

export const layoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBannerLayout: builder.query<any, void>({
      query: () => ({
        url: `/layouts/get-layout-by-type?type=Banner`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Layout"] as any,
    }),
    getFaqsLayout: builder.query<any, void>({
      query: () => ({
        url: `/layouts/get-layout-by-type?type=Faqs`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Layout"] as any,
    }),
    getCategoriesLayout: builder.query<any, void>({
      query: () => ({
        url: `/layouts/get-layout-by-type?type=Categories`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Layout"] as any,
    }),
    editLayout: builder.mutation<any, any>({
      query: (data) => ({
        url: `/layouts/edit-layout`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Layout"] as any,
    }),
  }),
});

export const {
  useGetBannerLayoutQuery,
  useEditLayoutMutation,
  useGetFaqsLayoutQuery,
  useGetCategoriesLayoutQuery,
} = layoutApi;
