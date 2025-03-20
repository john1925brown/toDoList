import { TaskPriority, TaskStatus } from "@/common/enums/enums"
import { z } from "zod"

export const domainTaskSchema = z.object({
  title: z.string(),
  status: z.nativeEnum(TaskStatus),
  priority: z.nativeEnum(TaskPriority),
  addedDate: z.string(),
  description: z.string().nullable(),
  startDate: z.string().nullable(),
  deadline: z.string().nullable(),
  id: z.string(),
  todoListId: z.string(),
  order: z.number(),
})

export type DomainTask = z.infer<typeof domainTaskSchema>

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
