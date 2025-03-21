export type BaseResponse<T = {}> = {
  data: T
  fieldsErrors: FieldError[]
  messages: string[]
  resultCode: number
}

export type FieldError = {
  error: string
  field: string
}

export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"

