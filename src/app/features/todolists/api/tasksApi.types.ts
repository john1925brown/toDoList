import { TaskPriority, TaskStatus } from "@/common/enums/enums"

export type DomainTask = {
  description: string | null
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string | null
  deadline: string | null
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export type GetTasksResponse = {
  items: DomainTask[]
  totalCount: number
  error: string | null
}

export type UpdateTaskModel = {
  title: string
  description: string | null
  status: TaskStatus
  priority: TaskPriority
  startDate: string | null
  deadline: string | null
}

export type DeleteTaskArgs = { todolistId: string; taskId: string }
export type CreateTaskArgs = { todolistId: string; title: string }
