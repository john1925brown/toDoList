import type { TasksState } from "../../../App"
import { createSlice } from "@reduxjs/toolkit"
import { createTodolistTC, deleteTodolistTC } from "./todolists-slice"

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as TasksState,
  selectors: {
    selectTasks: (state) => state,
  },
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
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        delete state[action.payload.id]
      })
  },
})

export const { selectTasks } = tasksSlice.selectors
export const { deleteTaskAC, changeTaskStatusAC, changeTaskTitleAC, createTaskAC } = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer
