import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "../auth/authSlice";
// import { userRegistration } from "./profileSlice";

type UpdateProfilePictureData = {
  avatar: string;
};

export const profileApi = apiSlice.injectEndpoints({
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
          //   dispatch(
          //     userLoggedIn({
          //       user: result.data.user,
          //     })
          //   );
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useUpdateProfilePictureMutation } = profileApi;
