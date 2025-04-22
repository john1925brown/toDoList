import { domainTodolistSchema, Todolist } from "./../api/todolistsApi.types"
import { _todolistsApi } from "../api/todolistsApi"
import { createAppSlice, handleServerAppError, handleServerNetworkError } from "@/common/utils"
import { setStatus } from "@/app/app-slice"
import { RequestStatus } from "@/common/types"
import { ResultCode } from "@/common/enums/enums"
import { FilterValues } from "@/app/App"

export type DomainTodolist = Todolist & {
  filter: FilterValues
  entityStatus: RequestStatus
}

export const todolistsSlice = createAppSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  selectors: {
    selectTodolists: (state) => state,
  },
  reducers: (create) => {
    return {
      //actions
      changeTodolistFilterAC: create.reducer<{
        id: string
        filter: FilterValues
      }>((state, action) => {
        const index = state.findIndex((todolist) => todolist.id === action.payload.id)
        if (index !== -1) {
          state[index].filter = action.payload.filter
        }
      }),
      changeTodolistEntityStatusAC: create.reducer<{
        id: string
        entityStatus: RequestStatus
      }>((state, action) => {
        const index = state.findIndex((todolist) => todolist.id === action.payload.id)
        if (index !== -1) {
          state[index].entityStatus = action.payload.entityStatus
        }
      }),
      //thunk
      fetchTodolistsTC: create.asyncThunk(
        async (_args, thunkAPI) => {
          try {
            thunkAPI.dispatch(setStatus({ status: "loading" }))
            const res = await _todolistsApi.getTodolists()
            domainTodolistSchema.array().parse(res.data)
            thunkAPI.dispatch(setStatus({ status: "succeeded" }))
            return { todolists: res.data }
          } catch (error: any) {
            handleServerNetworkError(error, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(error)
          }
        },
        {
          fulfilled: (state, action) => {
            action.payload?.todolists.forEach((todo) => {
              state.push({ ...todo, filter: "all", entityStatus: "idle" })
            })
          },
        },
      ),
      createTodolistTC: create.asyncThunk(
        async (args: { title: string }, thunkAPI) => {
          try {
            thunkAPI.dispatch(setStatus({ status: "loading" }))
            const res = await _todolistsApi.createTodolist({ title: args.title })

            if (res.data.resultCode === ResultCode.Success) {
              thunkAPI.dispatch(setStatus({ status: "succeeded" }))
              return { todolist: res.data.data.item }
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
            state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" })
          },
        },
      ),
      deleteTodolistTC: create.asyncThunk(
        async (args: { id: string }, thunkAPI) => {
          try {
            thunkAPI.dispatch(setStatus({ status: "loading" }))
            thunkAPI.dispatch(changeTodolistEntityStatusAC({ id: args.id, entityStatus: "loading" }))

            await _todolistsApi.deleteTodolist(args.id)
            thunkAPI.dispatch(setStatus({ status: "succeeded" }))
            return args
          } catch (error: any) {
            thunkAPI.dispatch(setStatus({ status: "failed" }))
            thunkAPI.dispatch(changeTodolistEntityStatusAC({ id: args.id, entityStatus: "failed" }))
            handleServerNetworkError(error, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(error)
          }
        },
        {
          fulfilled: (state, action) => {
            const index = state.findIndex((todolist) => todolist.id === action.payload.id)
            if (index !== -1) {
              state.splice(index, 1)
            }
          },
        },
      ),
      changeTodolistTitleTC: create.asyncThunk(
        async (args: { id: string; title: string }, thunkAPI) => {
          try {
            thunkAPI.dispatch(setStatus({ status: "loading" }))
            const res = await _todolistsApi.updateTodolist(args)
            if (res.data.resultCode === ResultCode.Success) {
              thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }))
              return args
            } else {
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
            const index = state.findIndex((todolist) => todolist.id === action.payload.id)
            if (index !== -1) {
              state[index].title = action.payload.title
            }
          },
        },
      ),
    }
  },
})

export const { selectTodolists } = todolistsSlice.selectors
export const {
  changeTodolistFilterAC,
  changeTodolistEntityStatusAC,
  fetchTodolistsTC,
  createTodolistTC,
  deleteTodolistTC,
  changeTodolistTitleTC,
} = todolistsSlice.actions
export const todolistsReducer = todolistsSlice.reducer
function setAppStatusAC(_args: { status: string }): any {
  throw new Error("Function not implemented.")
}
