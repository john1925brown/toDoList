import { TaskStatus } from "@/common/enums/enums"
import type { TasksState } from "../../../App"
import { tasksApi } from "../api/tasksApi"
import { createTodolistTC, deleteTodolistTC } from "./todolists-slice"
import { createAppSlice } from "@/common/utils"
import { CreateTaskArgs, DeleteTaskArgs, UpdateTaskModel } from "../api/tasksApi.types"
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
            const res = await tasksApi.getTasks(todolistId)
            thunkAPI.dispatch(setStatus({ status: "succeeded" }))
            return { todolistId, tasks: res.data.items }
          } catch (error) {
            thunkAPI.dispatch(setStatus({ status: "failed" }))
            return thunkAPI.rejectWithValue(null)
          } finally {
            thunkAPI.dispatch(setStatus({ status: "idle" }))
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
            thunkAPI.dispatch(setStatus({ status: "succeeded" }))
            return { task: res.data.data.item }
          } catch (error) {
            thunkAPI.dispatch(setStatus({ status: "failed" }))

            return thunkAPI.rejectWithValue(null)
          } finally {
            thunkAPI.dispatch(setStatus({ status: "idle" }))
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
      changeTaskStatusTC: create.asyncThunk(
        async (args: { todolistId: string; taskId: string; status: TaskStatus }, thunkAPI) => {
          const { todolistId, taskId, status } = args

          try {
            const state = thunkAPI.getState() as RootState
            const tasks = state.tasks
            const tasksForTodo = tasks[todolistId]
            const currentTask = tasksForTodo.find((task) => task.id === taskId)

            if (currentTask) {
              const model: UpdateTaskModel = {
                status: status,
                title: currentTask.title,
                priority: currentTask.priority,
                deadline: currentTask.deadline,
                description: currentTask.description,
                startDate: currentTask.startDate,
              }

              thunkAPI.dispatch(setStatus({ status: "loading" }))
              await tasksApi.updateTask({ todolistId, taskId, model })
              thunkAPI.dispatch(setStatus({ status: "succeeded" }))
              return args
            } else {
              thunkAPI.dispatch(setStatus({ status: "failed" }))
              thunkAPI.rejectWithValue(null)
            }
          } catch (error) {
            return thunkAPI.rejectWithValue(null)
          } finally {
            thunkAPI.dispatch(setStatus({ status: "idle" }))
          }
        },
        {
          fulfilled: (state, action) => {
            const currentTask = state[action.payload!.todolistId].find((task) => task.id === action.payload!.taskId)
            if (currentTask) {
              currentTask.status = action.payload!.status
            }
          },
        },
      ),
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
export const { deleteTaskTC, changeTaskTitleAC, createTaskTC, fetchTasksTC, changeTaskStatusTC } = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer
