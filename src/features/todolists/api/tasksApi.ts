import { instance } from "@/common/instance"
import { CreateTaskArgs, DeleteTaskArgs, DomainTask, GetTasksResponse, UpdateTaskModel } from "./tasksApi.types"
import { BaseResponse } from "@/common/types"
import { baseApi } from "@/app/baseApi"

export const _tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
  },
  createTask(payload: CreateTaskArgs) {
    const { todolistId, title } = payload
    return instance.post<BaseResponse<{ item: DomainTask }>>(`/todo-lists/${todolistId}/tasks`, {
      title,
    })
  },
  updateTask(payload: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
    const { todolistId, taskId, model } = payload
    return instance.put<BaseResponse<{ item: DomainTask }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
  deleteTask(payload: DeleteTaskArgs) {
    return instance.delete<BaseResponse>(`/todo-lists/${payload.todolistId}/tasks/${payload.taskId}`)
  },
}

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTasksResponse, string>({
      query: (id) => `/todo-lists/${id}/tasks`,
      providesTags: ["Tasks"],
    }),
    updateTask: build.mutation<
      BaseResponse<{ item: DomainTask }>,
      { todolistId: string; taskId: string; model: UpdateTaskModel }
    >({
      query: ({ todolistId, taskId, model }) => ({
        method: "PUT",
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        body: model,
      }),
      invalidatesTags: ["Tasks"],
    }),
    createTask: build.mutation<BaseResponse<{ item: DomainTask }>, CreateTaskArgs>({
      query: ({ todolistId, title }) => ({
        method: "POST",
        url: `/todo-lists/${todolistId}/tasks`,
        body: { title },
      }),
      invalidatesTags: ["Tasks"],
    }),
    deleteTask: build.mutation<BaseResponse, DeleteTaskArgs>({
      query: ({ todolistId, taskId }) => ({
        method: "DELETE",
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
})

export const { useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = tasksApi
