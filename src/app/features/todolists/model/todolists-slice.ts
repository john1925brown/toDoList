import { Todolist } from "./../api/todolistsApi.types"
import type { FilterValues } from "../../../App"
import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit"
import { todolistsApi } from "../api/todolistsApi"

export type DomainTodolist = Todolist & {
  filter: FilterValues
}

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  selectors: {
    selectTodolists: (state) => state,
  },
  reducers: (create) => {
    return {
      changeTodolistFilterAC: create.reducer<{
        id: string
        filter: FilterValues
      }>((state, action) => {
        const index = state.findIndex((todolist) => todolist.id === action.payload.id)
        if (index !== -1) {
          state[index].filter = action.payload.filter
        }
      }),
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(setTodolistsTC.fulfilled, (state, action) => {
        action.payload?.todolists.forEach((todo) => {
          state.push({ ...todo, filter: "all" })
        })
      })
      .addCase(setTodolistsTC.rejected, () => {
        console.log("catch error")
      })
      .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
        const index = state.findIndex((todolist) => todolist.id === action.payload.id)
        if (index !== -1) {
          state[index].title = action.payload.title
        }
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        const index = state.findIndex((todolist) => todolist.id === action.payload.id)
        if (index !== -1) {
          state.splice(index, 1)
        }
      })
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        state.unshift({ ...action.payload.todolist, filter: "all" })
      })
  },
})

export const setTodolistsTC = createAsyncThunk(`${todolistsSlice.name}/setTodolistsTC`, async (_args, thunkAPI) => {
  try {
    const res = await todolistsApi.getTodolists()
    return { todolists: res.data }
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const changeTodolistTitleTC = createAsyncThunk(
  `${todolistsSlice.name}/changeTodolistTitleTC`,
  async (args: { id: string; title: string }, thunkAPI) => {
    try {
      await todolistsApi.updateTodolist(args)
      return args
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(null)
    }
  },
)

export const deleteTodolistTC = createAsyncThunk(
  `${todolistsSlice.name}/deleteTodolistTitleTC`,
  async (args: { id: string }, thunkAPI) => {
    try {
      todolistsApi.deleteTodolist(args.id)
      return args
    } catch (error) {
      return thunkAPI.rejectWithValue(null)
    }
  },
)

export const createTodolistTC = createAsyncThunk(
  `${todolistsSlice.name}/createTodolistTitleTC`,
  async (args: { title: string }, thunkAPI) => {
    try {
      const res = await todolistsApi.createTodolist(args.title)
      return { todolist: res.data.data.item }
    } catch (error) {
      return thunkAPI.rejectWithValue(null)
    }
  },
)

export const { selectTodolists } = todolistsSlice.selectors
export const { changeTodolistFilterAC } = todolistsSlice.actions
export const todolistsReducer = todolistsSlice.reducer
