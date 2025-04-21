import { configureStore } from "@reduxjs/toolkit"
import { appReducer, appSlice } from "./app-slice"
import { tasksReducer, tasksSlice } from "@/features/todolists/model/tasks-slice"
import { todolistsReducer, todolistsSlice } from "@/features/todolists/model/todolists-slice"
import { todolistsApi } from "@/features/todolists/api/todolistsApi"
import { setupListeners } from "@reduxjs/toolkit/query"
import { baseApi } from "./baseApi"

export const store = configureStore({
  reducer: {
    [tasksSlice.name]: tasksReducer,
    [todolistsSlice.name]: todolistsReducer,
    [appSlice.name]: appReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todolistsApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store
