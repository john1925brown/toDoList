import { instance } from "@/common/instance"
import { BaseResponse } from "@/common/types"
import { Inputs } from "@/features/todolists/api/lib/schemas/LoginSchema"
import { LoginResponce, MeResponce } from "./authApi.types"
import { baseApi } from "@/app/baseApi"

export const _authApi = {
  login(payload: Inputs) {
    return instance.post<BaseResponse<LoginResponce>>(`/auth/login`, payload)
  },
  logout() {
    return instance.delete<BaseResponse>(`/auth/login`)
  },
  me() {
    return instance.get<BaseResponse<MeResponce>>(`auth/me`)
  },
}

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
  }),
})

export const { useMeQuery, useLoginMutation, useLogoutMutation } = authApi
