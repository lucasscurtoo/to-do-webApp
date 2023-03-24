import { api } from "./api"

export const listsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserLists: builder.query({
      query: (username) => `lists/getUserLists?username=${username}`,
      providesTags: ["Lists"],
    }),
    createUserList: builder.mutation({
      query: (body) => ({
        url: "lists/createList",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Lists"],
    }),
    editUserList: builder.mutation({
      query: (body) => ({
        url: "lists/updateList",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Lists"],
    }),
    deleteUserList: builder.mutation({
      query: (body) => ({
        url: "lists/deleteList",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Lists"],
    }),
  }),
})

export const {
  useGetUserListsQuery,
  useCreateUserListMutation,
  useEditUserListMutation,
  useDeleteUserListMutation,
} = listsApi
