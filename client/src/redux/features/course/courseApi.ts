import { apiSlice } from "@/src/redux/features/api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: "/courses/create-course",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    getAllCoursesAdmin: builder.query<any, { page: number; limit: string }>({
      query: ({ page, limit }) => ({
        url: `/courses/get-all-courses-admin?page=${page}&limit=${limit}`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const { useCreateCourseMutation, useGetAllCoursesAdminQuery } =
  courseApi;
