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
  }),
});

export const { useCreateCourseMutation } = courseApi;
