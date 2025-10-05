import { apiSlice } from "@/src/redux/features/api/apiSlice";

export const layoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // createLayout: builder.mutation({
    //   query: (data) => ({
    //     url: "/layout/create-layout",
    //     method: "POST",
    //     body: data,
    //     credentials: "include",
    //   }),
    // }),
    getLayoutByType: builder.query<any, { type: string }>({
      query: ({ type }) => ({
        url: `/layouts/get-layout-by-type?type=${type}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Layout"] as any,
      keepUnusedDataFor: 0,
    }),
    editLayout: builder.mutation<
      any,
      { type: string; title: string; subtitle: string }
    >({
      query: ({ type, title, subtitle }) => ({
        url: `/layouts/edit-layout`,
        method: "PUT",
        body: { type, title, subtitle },
        credentials: "include",
      }),
      invalidatesTags: ["Layout"] as any,
    }),
  }),
});

export const { useGetLayoutByTypeQuery, useEditLayoutMutation } = layoutApi;
