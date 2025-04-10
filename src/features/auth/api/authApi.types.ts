import { Inputs } from "@/features/todolists/api/lib/schemas/LoginSchema"

export type MeResponce = {
  id: number
  email: string
  login: string
}

export type LoginResponce = { userId: number; token: string }

export type LoginArgs = Inputs & {
  captcha?: string
}