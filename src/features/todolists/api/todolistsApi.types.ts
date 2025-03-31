import { z } from "zod"

export const domainTodolistSchema = z.object({
  id: z.string(),
  addedDate: z.string(),
  order: z.number(),
  title: z.string(),
})

export type Todolist = z.infer<typeof domainTodolistSchema>
