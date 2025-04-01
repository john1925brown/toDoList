import { setStatus } from "@/app/app-slice"
import { createAppSlice, handleServerAppError, handleServerNetworkError } from "@/common/utils"
import { Inputs } from "@/features/todolists/api/lib/schemas/LoginSchema"
import { authApi } from "../api/authApi"
import { ResultCode } from "@/common/enums/enums"
import { AUTH_TOKEN } from "@/common/contains"

export const authSlice = createAppSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  selectors: { selectIsLoggedIn: (state) => state.isLoggedIn },
  reducers: (create) => ({
    loginTC: create.asyncThunk(
      async (data: Inputs, thunkAPI) => {
        try {
          thunkAPI.dispatch(setStatus({ status: "loading" }))
          const res = await authApi.login(data)
          if (res.data.resultCode === ResultCode.Success) {
            thunkAPI.dispatch(setStatus({ status: "succeeded" }))
            localStorage.setItem(AUTH_TOKEN, res.data.data.token)
            return { isLoggedIn: true }
          } else {
            thunkAPI.dispatch(setStatus({ status: "failed" }))
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(null)
          }
        } catch (error: any) {
          handleServerNetworkError(error, thunkAPI.dispatch)
          return thunkAPI.rejectWithValue(error)
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn
        },
      },
    ),
    logoutTC: create.asyncThunk(
      async (_args, thunkAPI) => {
        try {
          thunkAPI.dispatch(setStatus({ status: "loading" }))
          const res = await authApi.logout()

          if (res.data.resultCode === ResultCode.Success) {
            thunkAPI.dispatch(setStatus({ status: "succeeded" }))
            localStorage.removeItem(AUTH_TOKEN)
            return { isLoggedIn: false }
          } else {
            thunkAPI.dispatch(setStatus({ status: "failed" }))
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(null)
          }
        } catch (error: any) {
          handleServerNetworkError(error, thunkAPI.dispatch)
          return thunkAPI.rejectWithValue(error)
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn
        },
      },
    ),
    initializeAppTC: create.asyncThunk(
      async (_args, thunkAPI) => {
        try {
          thunkAPI.dispatch(setStatus({ status: "loading" }))
          const res = await authApi.me()

          if (res.data.resultCode === ResultCode.Success) {
            thunkAPI.dispatch(setStatus({ status: "succeeded" }))
            return { isLoggedIn: true }
          } else {
            thunkAPI.dispatch(setStatus({ status: "failed" }))
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(null)
          }
        } catch (error: any) {
          handleServerNetworkError(error, thunkAPI.dispatch)
          return thunkAPI.rejectWithValue(error)
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn
        },
      },
    ),
  }),
})

export const { selectIsLoggedIn } = authSlice.selectors
export const { loginTC, logoutTC, initializeAppTC } = authSlice.actions
export const authReducer = authSlice.reducer
