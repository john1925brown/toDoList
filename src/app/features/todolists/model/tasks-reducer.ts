import type { TasksState } from "../../../App"
import { createTodolistAC, deleteTodolistAC } from "./todolists-reducer"
import { createAction, createReducer, nanoid } from "@reduxjs/toolkit"

const initialState: TasksState = {}

export const deleteTaskAC = createAction<{
  taskId: string
  todolistId: string
}>("todolists/deleteTask")

export const createTaskAC = createAction(
  "todolists/createTask",
  ({ title, todolistId }: { title: string; todolistId: string }) => {
    return { payload: { title, id: nanoid(), todolistId } }
  },
)

export const changeTaskStatusAC = createAction<{
  todolistId: string
  taskId: string
  isDone: boolean
}>("todolists/changeTaskStatus")

export const changeTaskTitleAC = createAction<{
  todolistId: string
  taskId: string
  title: string
}>("todolists/changeTaskTitleAC")

export const tasksReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(deleteTodolistAC, (state, action) => {
      delete state[action.payload.id]
    })
    .addCase(createTodolistAC, (state, action) => {
      state[action.payload.id] = []
    })
    .addCase(deleteTaskAC, (state, action) => {
      const index = state[action.payload.todolistId].findIndex((task) => {
        task.id === action.payload.taskId
      })
      state[action.payload.todolistId].splice(index, 1)
    })
    .addCase(createTaskAC, (state, action) => {
      state[action.payload.todolistId].unshift({
        ...action.payload,
        isDone: false,
      })
    })
    .addCase(changeTaskStatusAC, (state, action) => {
      const currentTask = state[action.payload.todolistId].find((task) => task.id === action.payload.taskId)
      if (currentTask) {
        currentTask.isDone = !currentTask.isDone
      }
    })
    .addCase(changeTaskTitleAC, (state, action) => {
      const currentTask = state[action.payload.todolistId].find((task) => task.id === action.payload.taskId)
      if (currentTask) {
        currentTask.title = action.payload.title
      }
    })
})
