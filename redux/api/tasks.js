import { api } from "./api"

export const tasksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createTask: builder.mutation({
      query: (body) => ({
        url: "/tasks/createTask",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateTask: builder.mutation({
      query: (body) => ({
        url: "/tasks/updateTask",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Tasks"],
    }),
    deleteTask: builder.mutation({
      query: (body) => ({
        url: "/tasks/deleteTask",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Tasks"],
    }),
    completeOrDecompleteTask: builder.mutation({
      query: (body) => ({
        url: "/tasks/completeOrDecompleteTask",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
})

export const {
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useCompleteOrDecompleteTaskMutation,
} = tasksApi
