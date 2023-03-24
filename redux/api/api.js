import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  prepareHeaders: async (headers, { getState, extra }) => {
    const token =
      (await getState()?.userReducer?.userToken) ||
      localStorage.getItem("token")

    if (token) {
      headers.set("auth-token", token)
    }

    return headers
  },
})

export const api = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["Lists", "Tasks", "Users", "Auth"],
  endpoints: () => ({}),
})

export const enhancedApi = api.enhanceEndpoints({
  endpoints: () => ({}),
})
