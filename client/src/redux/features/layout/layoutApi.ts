import { apiSlice } from "@/src/redux/features/api/apiSlice";

export const layoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLayoutByType: builder.query<any, { type: string }>({
      query: ({ type }) => ({
        url: `/layouts/get-layout-by-type?type=${type}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Layout"] as any,
      keepUnusedDataFor: 0,
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

export const { useGetLayoutByTypeQuery, useEditLayoutMutation } = layoutApi;
