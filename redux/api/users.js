import { api } from "./api"

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserDarkMode: builder.query({
      query: (username) => `/users/getUserDarkMode?username=${username}`,
      providesTag: ["Users"],
    }),
    updateUserDarkMode: builder.mutation({
      query: (body) => ({
        url: "/users/updateUserDarkMode",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
})

export const { useGetUserDarkModeQuery, useUpdateUserDarkModeMutation } =
  usersApi
