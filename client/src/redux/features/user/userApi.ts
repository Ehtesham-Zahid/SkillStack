import { apiSlice } from "../api/apiSlice";
import { setUser } from "../auth/authSlice";
// import { userRegistration } from "./profileSlice";

type UpdateProfilePictureData = {
  avatar: string;
};

type UpdateUserInfoData = {
  name: string;
  email: string;
};

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // endpoints here
    updateProfilePicture: builder.mutation<any, UpdateProfilePictureData>({
      query: (data) => ({
        url: "/users/update-profile-picture",
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log(result.data);
          dispatch(
            setUser({
              user: result.data.user,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    updateUserInfo: builder.mutation<any, UpdateUserInfoData>({
      query: (data) => ({
        url: "/users/update-user-info",
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log(result.data);
          dispatch(
            setUser({
              user: result.data.user,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    updatePassword: builder.mutation({
      query: ({ oldPassword, newPassword }) => ({
        url: "/users/update-password",
        method: "PUT",
        body: {
          oldPassword,
          newPassword,
        },
        credentials: "include",
      }),
    }),
    getAllUsers: builder.query<any, void>({
      query: () => ({
        url: "/users/get-all-users-admin",
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useUpdateProfilePictureMutation,
  useUpdateUserInfoMutation,
  useUpdatePasswordMutation,
  useGetAllUsersQuery,
} = userApi;
