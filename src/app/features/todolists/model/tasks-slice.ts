import { TaskStatus } from "@/common/enums/enums"
import type { TasksState } from "../../../App"
import { tasksApi } from "../api/tasksApi"
import { createTodolistTC, deleteTodolistTC } from "./todolists-slice"
import { createAppSlice } from "@/common/utils"
import { CreateTaskArgs, DeleteTaskArgs } from "../api/tasksApi.types"

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
        async (args: CreateTaskArgs, thunkAPI) => {
          try {
            const res = await tasksApi.createTask(args)
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
      deleteTaskTC: create.asyncThunk(
        async (args: DeleteTaskArgs, thunkAPI) => {
          try {
            await tasksApi.deleteTask(args)
            return args
          } catch (error) {
            return thunkAPI.rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex((task) => task.id === action.payload.taskId)
            if (index !== -1) {
              tasks.splice(index, 1)
            }
          },
        },
      ),

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
export const { deleteTaskTC, changeTaskStatusAC, changeTaskTitleAC, createTaskTC, fetchTasksTC } = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer
