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
      providesTags: ["Courses"] as any,
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/courses/delete-course-admin/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Courses"] as any,
    }),
    getSingleCourseAdmin: builder.query<any, string>({
      query: (id) => ({
        url: `/courses/get-single-course-admin/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Course"] as any,
    }),
    editCourse: builder.mutation({
      query: ({ data, id }: { data: any; id: string }) => ({
        url: `/courses/edit-course/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Course", "Courses"] as any,
    }),
    getSingleCourse: builder.query<any, string>({
      query: (id) => ({
        url: `/courses/get-course/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getAllCourses: builder.query<any, void>({
      query: () => ({
        url: `/courses/get-all-courses`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetAllCoursesAdminQuery,
  useDeleteCourseMutation,
  useGetSingleCourseAdminQuery,
  useEditCourseMutation,
  useGetSingleCourseQuery,
  useGetAllCoursesQuery,
} = courseApi;
