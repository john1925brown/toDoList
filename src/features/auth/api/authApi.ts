import { BaseResponse } from "@/common/types"
import { Inputs } from "@/features/todolists/api/lib/schemas/LoginSchema"
import { LoginResponce, MeResponce } from "./authApi.types"
import { baseApi } from "@/app/baseApi"

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    me: build.query<BaseResponse<MeResponce>, void>({
      query: () => `auth/me`,
    }),
    login: build.mutation<BaseResponse<LoginResponce>, Inputs>({
      query: (body) => ({
        method: "POST",
        url: `/auth/login`,
        body,
      }),
    }),
    logout: build.mutation<BaseResponse, void>({
      query: () => ({
        method: "DELETE",
        url: `/auth/login`,
      }),
    }),
    getCaptcha: build.query<{ url: string }, void>({
      query: () => "security/get-captcha-url",
    }),
  }),
})

export const { useMeQuery, useLoginMutation, useLogoutMutation, useLazyGetCaptchaQuery } = authApi
