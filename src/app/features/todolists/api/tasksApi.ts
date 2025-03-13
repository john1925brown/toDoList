import { instance } from "@/common/instance"
import { CreateTaskArgs, DeleteTaskArgs, DomainTask, GetTasksResponse, UpdateTaskModel } from "./tasksApi.types"
import { BaseResponse } from "@/common/types"

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
  },
  createTask(payload: CreateTaskArgs) {
    const { todolistId, title } = payload
    return instance.post<BaseResponse<{ item: DomainTask }>>(`/todo-lists/${todolistId}/tasks`, {
      title,
    })
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModel) {
    return instance.put<BaseResponse<{ item: DomainTask }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
  deleteTask(payload: DeleteTaskArgs) {
    return instance.delete<BaseResponse>(`/todo-lists/${payload.todolistId}/tasks/${payload.taskId}`)
  },
}
