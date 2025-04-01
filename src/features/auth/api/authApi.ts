import { instance } from "@/common/instance"
import { BaseResponse } from "@/common/types"
import { Inputs } from "@/features/todolists/api/lib/schemas/LoginSchema"
import { LoginResponce, MeResponce } from "./authApi.types"

export const authApi = {
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

