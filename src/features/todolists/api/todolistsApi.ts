import { instance } from "@/common/instance"
import { Todolist } from "./todolistsApi.types"
import { BaseResponse } from "@/common/types"
import { DomainTodolist } from "../model/todolists-slice"
import { baseApi } from "@/app/baseApi"

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
    // Типизация аргументов (<возвращаемый тип, тип query аргументов (`QueryArg`)>)
    // `query` по умолчанию создает запрос `get` и указание метода необязательно
    // getTodolists: build.query<any[], void>({
    //   query: () => "todo-lists",
    // }),

    getTodolists: build.query<any[], void>({
      query: () => "/todo-lists",
      transformResponse: (todolists: Todolist[]): DomainTodolist[] => {
        return todolists.map((todolist) => {
          return { ...todolist, filter: "all", entityStatus: "idle" }
        })
      },
      providesTags: ["Todolist"],
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
      invalidatesTags: ["Todolist"],
    }),
    deleteTodolist: build.mutation<BaseResponse, string>({
      query: (id) => {
        return {
          method: "DELETE",
          url: `/todo-lists/${id}`,
        }
      },
      invalidatesTags: ["Todolist"],
    }),
    updateTodolistTitle: build.mutation<BaseResponse, { id: string; title: string }>({
      query: ({ id, title }) => {
        return {
          method: "PUT",
          url: `/todo-lists/${id}`,
          body: { title },
        }
      },
      invalidatesTags: ["Todolist"],
    }),
  }),
})

export const {
  useGetTodolistsQuery,
  useCreateTodolistMutation,
  useDeleteTodolistMutation,
  useUpdateTodolistTitleMutation,
} = todolistsApi
