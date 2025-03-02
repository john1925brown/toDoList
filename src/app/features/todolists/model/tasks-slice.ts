import type { TasksState } from "../../../App"
import { createAction, createReducer, createSlice, nanoid } from "@reduxjs/toolkit"
import { createTodolistAC, deleteTodolistAC } from "./todolists-slice"

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as TasksState,
  reducers: (create) => {
    return {
      deleteTaskAC: create.reducer<{
        taskId: string
        todolistId: string
      }>((state, action) => {
        const index = state[action.payload.todolistId].findIndex((task) => {
          task.id === action.payload.taskId
        })
        state[action.payload.todolistId].splice(index, 1)
      }),
      changeTaskStatusAC: create.reducer<{
        todolistId: string
        taskId: string
        isDone: boolean
      }>((state, action) => {
        const currentTask = state[action.payload.todolistId].find((task) => task.id === action.payload.taskId)
        if (currentTask) {
          currentTask.isDone = !currentTask.isDone
        }
      }),
      changeTaskTitleAC: create.reducer<{
        todolistId: string
        taskId: string
        title: string
      }>((state, action) => {
        const currentTask = state[action.payload.todolistId].find((task) => task.id === action.payload.taskId)
        if (currentTask) {
          currentTask.title = action.payload.title
        }
      }),
      createTaskAC: create.reducer<{ todolistId: string; title: string }>((state, action) => {
        const newTask = { title: action.payload.title, id: action.payload.todolistId, isDone: false }
        state[action.payload.todolistId].unshift(newTask)
      }),
    }
  },
  extraReducers: (builder) => {
    // для подредьюсеров, которые обрабатываются в других слайсов
    builder
      .addCase(createTodolistAC, (state, action) => {
        state[action.payload.id] = []
      })
      .addCase(deleteTodolistAC, (state, action) => {
        delete state[action.payload.id]
      })
  },
})

export const { deleteTaskAC, changeTaskStatusAC, changeTaskTitleAC, createTaskAC } = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer

// export const createTaskAC = createAction(
//   "todolists/createTask",
//   ({ title, todolistId }: { title: string; todolistId: string }) => {
//     return { payload: { title, id: nanoid(), todolistId } }
//   },
// )
