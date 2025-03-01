import { Todolist } from "./../api/todolistsApi.types"
import type { FilterValues } from "../../../App"
import { createSlice, nanoid } from "@reduxjs/toolkit"

export type DomainTodolist = Todolist & {
  filter: FilterValues
}

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  reducers: (create) => {
    return {
      setTodolistsAC: create.reducer<{ todolists: Todolist[] }>((state, action) => {
        action.payload.todolists.forEach((todo) => {
          state.push({ ...todo, filter: "all" })
        })
      }),
      deleteTodolistAC: create.reducer<{ id: string }>((state, action) => {
        const index = state.findIndex((todolist) => todolist.id === action.payload.id)
        if (index !== -1) {
          state.splice(index, 1)
        }
      }),
      changeTodolistTitleAC: create.reducer<{
        id: string
        title: string
      }>((state, action) => {
        const index = state.findIndex((todolist) => todolist.id === action.payload.id)
        if (index !== -1) {
          state[index].title = action.payload.title
        }
      }),
      changeTodolistFilterAC: create.reducer<{
        id: string
        filter: FilterValues
      }>((state, action) => {
        const index = state.findIndex((todolist) => todolist.id === action.payload.id)
        if (index !== -1) {
          state[index].filter = action.payload.filter
        }
      }),

      createTodolistAC: create.preparedReducer(
        (title: string) => {
          return { payload: { title, id: nanoid() } }
        },
        (state, action) => {
          const newTodolist: DomainTodolist = {
            title: action.payload.title,
            id: action.payload.id,
            addedDate: "",
            filter: "all",
            order: 0,
          }
          state.push(newTodolist)
        },
      ),
    }
  },
})

export const { deleteTodolistAC, changeTodolistTitleAC, changeTodolistFilterAC, createTodolistAC, setTodolistsAC } =
  todolistsSlice.actions
export const todolistsReducer = todolistsSlice.reducer
