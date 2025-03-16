import { Todolist } from "./../api/todolistsApi.types"
import type { FilterValues } from "../../../App"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { todolistsApi } from "../api/todolistsApi"
import { createAppSlice } from "@/common/utils"
import { setStatus } from "@/app/app-slice"

export type DomainTodolist = Todolist & {
  filter: FilterValues
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
      //thunk
      fetchTodolistsTC: create.asyncThunk(
        async (_args, thunkAPI) => {
          try {
            thunkAPI.dispatch(setStatus({ status: "loading" }))

            const res = await todolistsApi.getTodolists()
            thunkAPI.dispatch(setStatus({ status: "succeeded" }))
            return { todolists: res.data }
          } catch (error) {
            thunkAPI.dispatch(setStatus({ status: "failed" }))
            return thunkAPI.rejectWithValue(error)
          } finally {
            thunkAPI.dispatch(setStatus({ status: "idle" }))
          }
        },
        {
          fulfilled: (state, action) => {
            action.payload?.todolists.forEach((todo) => {
              state.push({ ...todo, filter: "all" })
            })
          },
        },
      ),
      createTodolistTC: create.asyncThunk(
        async (args: { title: string }, thunkAPI) => {
          try {
            thunkAPI.dispatch(setStatus({ status: "loading" }))
            const res = await todolistsApi.createTodolist({ title: args.title })
            thunkAPI.dispatch(setStatus({ status: "succeeded" }))
            return { todolist: res.data.data.item }
          } catch (error) {
            thunkAPI.dispatch(setStatus({ status: "failed" }))
            return thunkAPI.rejectWithValue(error)
          } finally {
            thunkAPI.dispatch(setStatus({ status: "idle" }))
          }
        },
        {
          fulfilled: (state, action) => {
            state.unshift({ ...action.payload.todolist, filter: "all" })
          },
        },
      ),
      deleteTodolistTC: create.asyncThunk(
        async (args: { id: string }, thunkAPI) => {
          try {
            thunkAPI.dispatch(setStatus({ status: "loading" }))
            todolistsApi.deleteTodolist(args.id)
            thunkAPI.dispatch(setStatus({ status: "succeeded" }))
            return args
          } catch (error) {
            thunkAPI.dispatch(setStatus({ status: "failed" }))
            return thunkAPI.rejectWithValue(error)
          } finally {
            thunkAPI.dispatch(setStatus({ status: "idle" }))
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
            await todolistsApi.updateTodolist(args)
            thunkAPI.dispatch(setStatus({ status: "succeeded" }))
            return args
          } catch (error) {
            thunkAPI.dispatch(setStatus({ status: "failed" }))
            return thunkAPI.rejectWithValue(error)
          } finally {
            thunkAPI.dispatch(setStatus({ status: "idle" }))
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
export const { changeTodolistFilterAC, fetchTodolistsTC, createTodolistTC, deleteTodolistTC, changeTodolistTitleTC } =
  todolistsSlice.actions
export const todolistsReducer = todolistsSlice.reducer
