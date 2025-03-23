import { ResultCode } from "@/common/enums/enums"
import type { TasksState } from "../../../App"
import { tasksApi } from "../api/tasksApi"
import { createTodolistTC, deleteTodolistTC } from "./todolists-slice"
import { createAppSlice, handleServerAppError, handleServerNetworkError } from "@/common/utils"
import { CreateTaskArgs, DeleteTaskArgs, domainTaskSchema, UpdateTaskModel } from "../api/tasksApi.types"
import { RootState } from "@/app/store"
import { setStatus } from "@/app/app-slice"










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
            thunkAPI.dispatch(setStatus({ status: "loading" }))
            //zod
            const res = await tasksApi.getTasks(todolistId)
            domainTaskSchema.array().parse(res.data.items)
            thunkAPI.dispatch(setStatus({ status: "succeeded" }))
            return { todolistId, tasks: res.data.items }
          } catch (error: any) {
            handleServerNetworkError(error, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(null)
          } finally {
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
            thunkAPI.dispatch(setStatus({ status: "loading" }))
            const res = await tasksApi.createTask(args)

            if (res.data.resultCode === ResultCode.Success) {
              thunkAPI.dispatch(setStatus({ status: "succeeded" }))
              return { task: res.data.data.item }
            } else {
              handleServerAppError(res.data, thunkAPI.dispatch)
              return thunkAPI.rejectWithValue(null)
            }
          } catch (error: any) {
            handleServerNetworkError(error, thunkAPI.dispatch)
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
            const res = await tasksApi.deleteTask(args)
            if (res.data.resultCode === ResultCode.Success) {
              thunkAPI.dispatch(setStatus({ status: "succeeded" }))
              return args
            } else {
              handleServerAppError(res.data, thunkAPI.dispatch)
              return thunkAPI.rejectWithValue(null)
            }
          } catch (error: any) {
            handleServerNetworkError(error, thunkAPI.dispatch)
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
      updateTaskTC: create.asyncThunk(
        async (args: { todolistId: string; taskId: string; domainModel: Partial<UpdateTaskModel> }, thunkAPI) => {
          const { todolistId, taskId, domainModel } = args
          try {
            const state = thunkAPI.getState() as RootState
            const tasks = state.tasks
            const tasksForTodo = tasks[todolistId]
            const currentTask = tasksForTodo.find((task) => task.id === taskId)

            if (!currentTask) {
              thunkAPI.dispatch(setStatus({ status: "failed" }))
              return thunkAPI.rejectWithValue(null)
            }

            const model: UpdateTaskModel = {
              status: currentTask.status,
              title: currentTask.title,
              priority: currentTask.priority,
              deadline: currentTask.deadline,
              description: currentTask.description,
              startDate: currentTask.startDate,
              ...domainModel,
            }

            thunkAPI.dispatch(setStatus({ status: "loading" }))
            const res = await tasksApi.updateTask({ todolistId, taskId, model })

            if (res.data.resultCode === ResultCode.Success) {
              thunkAPI.dispatch(setStatus({ status: "succeeded" }))
              return { task: res.data.data.item }
            } else {
              handleServerAppError(res.data, thunkAPI.dispatch)
              return thunkAPI.rejectWithValue(null)
            }
          } catch (error: any) {
            handleServerNetworkError(error, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            const allTodolistTasks = state[action.payload!.task.todoListId]
            const taskIndex = allTodolistTasks.findIndex((task) => task.id === action.payload!.task.id)
            if (taskIndex !== -1) {
              allTodolistTasks[taskIndex] = action.payload!.task
            }
          },
        },
      ),
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
export const { deleteTaskTC, createTaskTC, fetchTasksTC, updateTaskTC } = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer
