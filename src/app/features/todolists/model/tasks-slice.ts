import { TaskPriority, TaskStatus } from "@/common/enums/enums"
import type { TasksState } from "../../../App"
import { tasksApi } from "../api/tasksApi"
import { createTodolistTC, deleteTodolistTC } from "./todolists-slice"
import { createAppSlice } from "@/common/utils"
import { DomainTask } from "../api/tasksApi.types"
import { nanoid } from "@reduxjs/toolkit/react"
import { act } from "react"

export const tasksSlice = createAppSlice({
  name: "tasks",
  initialState: {} as TasksState,
  selectors: {
    selectTasks: (state) => state,
  },
  reducers: (create) => {
    return {
      fetchTasksTC: create.asyncThunk(
        async (todolistId: string, thunkAPI) => {
          try {
            const res = await tasksApi.getTasks(todolistId)
            return { todolistId, tasks: res.data.items }
          } catch (error) {
            return thunkAPI.rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
          },
        },
      ),
      createTaskTC: create.asyncThunk(
        async (args: { todolistId: string; title: string }, thunkAPI) => {
          try {
            const res = await tasksApi.createTask(args.todolistId, args.title)
            return { task: res.data.data.item }
          } catch (error) {
            return thunkAPI.rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            state[action.payload.task.todoListId].unshift(action.payload.task)
          },
        },
      ),
      // actions
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
          currentTask.status = action.payload.isDone ? TaskStatus.Completed : TaskStatus.New
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
export const { deleteTaskAC, changeTaskStatusAC, changeTaskTitleAC, createTaskTC, fetchTasksTC } = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer
