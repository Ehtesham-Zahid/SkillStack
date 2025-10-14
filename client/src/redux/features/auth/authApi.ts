import { apiSlice } from "../api/apiSlice";
import {
  userRegistration,
  userLoggedIn,
  userLoggedOut,
  setShowAuthDialog,
} from "./authSlice";

type UserRegistrationResponse = {
  message: string;
  activationToken: string;
};

type UserRegistrationData = {
  name: string;
  email: string;
  password: string;
};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // endpoints here
    register: builder.mutation<UserRegistrationResponse, UserRegistrationData>({
      query: (data) => ({
        url: "/users/registration",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log(result.data);
          dispatch(userRegistration({ token: result.data.activationToken }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    activation: builder.mutation({
      query: ({ activationToken, activationCode }) => ({
        url: "/users/activate-user",
        method: "POST",
        body: { activationToken, activationCode },
        credentials: "include",
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/users/login",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              user: result.data.user,
              token: result.data.accessToken,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    socialAuth: builder.mutation({
      query: (data) => ({
        url: "/users/social-auth",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              user: result.data.user,
              token: result.data.accessToken,
            })
          );
          console.log(result.data);
          dispatch(setShowAuthDialog(false));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/users/logout",
        method: "GET",
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          console.log("logged out");
          dispatch(userLoggedOut());
          localStorage.removeItem("socialSynced");
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useActivationMutation,
  useLoginMutation,
  useSocialAuthMutation,
  useLogoutMutation,
} = authApi;
