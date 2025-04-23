import { AUTH_TOKEN } from "@/common/contains"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { handleError } from "@/common/utils"

export const baseApi = createApi({
  reducerPath: "todolistsApi",
  tagTypes: ["Todolists", "Tasks"],
  baseQuery: async (args, api, extraOptions) => {
    // await new Promise((resolve) => setTimeout(resolve, 3000))
    const result = await fetchBaseQuery({
      baseUrl: import.meta.env.VITE_BASE_URL,
      prepareHeaders: (headers) => {
        headers.set("API-KEY", import.meta.env.VITE_API_KEY)
        headers.set("Authorization", `Bearer ${localStorage.getItem(AUTH_TOKEN)}`)
      },
    })(args, api, extraOptions)
    handleError(result, api)

    return result
  },
  endpoints: () => ({}),
})
