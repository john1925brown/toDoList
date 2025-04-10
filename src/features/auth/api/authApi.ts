import { BaseResponse } from "@/common/types"
import { Inputs } from "@/features/todolists/api/lib/schemas/LoginSchema"
import { LoginResponce, MeResponce } from "./authApi.types"
import { baseApi } from "@/app/baseApi"

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<BaseResponse<LoginResponce>, Inputs>({
      query: (body) => {
        return {
          method: "POST",
          url: `/auth/login`,
          body,
        }
      },
    }),
    logout: build.mutation<BaseResponse, void>({
      query: () => {
        return {
          method: "DELETE",
          url: `/auth/login`,
        }
      },
    }),
    me: build.query<BaseResponse<MeResponce>, void>({
      query: () => `auth/me`,
    }),
  }),
})

export const { useLoginMutation, useMeQuery, useLogoutMutation } = authApi
