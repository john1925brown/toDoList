import { instance } from "@/common/instance"
import { CreateTaskArgs, DeleteTaskArgs, DomainTask, GetTasksResponse, UpdateTaskModel } from "./tasksApi.types"
import { BaseResponse } from "@/common/types"
import { baseApi } from "@/app/baseApi"
import { PAGE_SIZE } from "@/common/constants"

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
    getTasks: build.query<GetTasksResponse, { todolistId: string; params: { page: number } }>({
      query: ({ todolistId, params }) => {
        return {
          url: `/todo-lists/${todolistId}/tasks`,
          params: { ...params, count: PAGE_SIZE },
        }
      },
      providesTags: (_res, _err, { todolistId }) => [{ type: "Tasks", id: todolistId }],
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
      async onQueryStarted({ todolistId, taskId, model }, { dispatch, queryFulfilled, getState }) {
        const cachedArgsForQuery = tasksApi.util.selectCachedArgsForQuery(getState(), "getTasks")

        let patchResults: any[] = []
        cachedArgsForQuery.forEach(({ params }) => {
          patchResults.push(
            dispatch(
              tasksApi.util.updateQueryData("getTasks", { todolistId, params: { page: params.page } }, (state) => {
                const index = state.items.findIndex((task) => task.id === taskId)
                if (index !== -1) {
                  state.items[index] = { ...state.items[index], ...model }
                }
              }),
            ),
          )
        })
        try {
          await queryFulfilled
        } catch {
          patchResults.forEach((patchResult) => {
            patchResult.undo()
          })
        }

        try {
          await queryFulfilled
        } catch {
          patchResults.forEach((res) => {
            res.undo()
          })
        }
      },
      invalidatesTags: (_result, _error, { todolistId }) => [{ type: "Tasks", id: todolistId }],
    }),
    createTask: build.mutation<BaseResponse<{ item: DomainTask }>, CreateTaskArgs>({
      query: ({ todolistId, title }) => ({
        method: "POST",
        url: `/todo-lists/${todolistId}/tasks`,
        body: { title },
      }),
      invalidatesTags: (_result, _error, { todolistId }) => [{ type: "Tasks", id: todolistId }],
    }),
    deleteTask: build.mutation<BaseResponse, DeleteTaskArgs>({
      query: ({ todolistId, taskId }) => ({
        method: "DELETE",
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
      }),
      invalidatesTags: (_result, _error, { todolistId }) => [{ type: "Tasks", id: todolistId }],
    }),
  }),
})

export const { useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = tasksApi
