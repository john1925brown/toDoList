import { instance } from "@/common/instance"
import { GetTasksResponse, Task, UpdateTaskModel } from "./tasksApi.types"
import { BaseResponse } from "@/common/types"

export const tasktApi = {
  getTask(todolistId: string) {
    return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
  },
  createTask(todolistId: string, title: string) {
    return instance.post<BaseResponse<{ item: Task }>>(`/todo-lists/${todolistId}/tasks`, {
      title,
    })
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModel) {
    return instance.put<BaseResponse<{ item: Task }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<BaseResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTaskTitle(todolistId: string, taskId: string, model: UpdateTaskModel) {
    return instance.put<BaseResponse<{item: Task}>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
}
