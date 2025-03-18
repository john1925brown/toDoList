import { setAppError, setStatus } from "@/app/app-slice"

import type { Dispatch } from "@reduxjs/toolkit"

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => { 
  dispatch(setAppError({ error: error.message }))
  dispatch(setStatus({ status: "failed" }))
}
