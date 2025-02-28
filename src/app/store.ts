import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { tasksReducer } from "./features/todolists/model/tasks-slice"
import { todolistsReducer } from "./features/todolists/model/todolists-slice"
import { appReducer } from "./app-slice"

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
  },
})

// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store
