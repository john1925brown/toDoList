import { instance } from "@/common/instance"
import { Todolist } from "./todolistsApi.types"
import { BaseResponse } from "@/common/types"
import { baseApi } from "@/app/baseApi"
import { DomainTodolist } from "../ui/Todolists/lib/types"

export const _todolistsApi = {
  getTodolists() {
    return instance.get<Todolist[]>("/todo-lists")
  },
  createTodolist(payload: { title: string }) {
    const { title } = payload
    return instance.post<BaseResponse<{ item: Todolist }>>("/todo-lists", {
      title,
    })
  },
  deleteTodolist(id: string) {
    return instance.delete<BaseResponse>(`/todo-lists/${id}`)
  },
  updateTodolist(payload: { id: string; title: string }) {
    const { id, title } = payload
    return instance.put<BaseResponse>(`/todo-lists/${id}`, { title })
  },
}

export const todolistsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTodolists: build.query<any[], void>({
      query: () => "/todo-lists",
      providesTags: ["Todolists"],
      transformResponse: (todolists: Todolist[]): DomainTodolist[] => {
        return todolists.map((todolist) => ({ ...todolist, filter: "all" }))
      },
    }),
    updateTodolistTitle: build.mutation<BaseResponse, { id: string; title: string }>({
      query: ({ id, title }) => {
        return {
          method: "PUT",
          url: `/todo-lists/${id}`,
          body: { title },
        }
      },
      invalidatesTags: ["Todolists"],
    }),
    deleteTodolist: build.mutation<BaseResponse, string>({
      query: (id) => {
        return {
          method: "DELETE",
          url: `/todo-lists/${id}`,
          body: { id },
        }
      },
      async onQueryStarted(id: string, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todolistsApi.util.updateQueryData("getTodolists", undefined, (state) => {
            const index = state.findIndex((todo) => todo.id === id)
            if (index !== 1) state.splice(index, 1)
          }),
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      invalidatesTags: ["Todolists"],
    }),
    createTodolist: build.mutation<BaseResponse<{ item: Todolist }>, string>({
      query: (title) => {
        return {
          method: "POST",
          url: "/todo-lists",
          body: {
            title,
          },
        }
      },
      invalidatesTags: ["Todolists"],
    }),
  }),
})

export const {
  useGetTodolistsQuery,
  useCreateTodolistMutation,
  useDeleteTodolistMutation,
  useUpdateTodolistTitleMutation,
} = todolistsApi
