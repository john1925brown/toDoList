import {  Todolist } from "@/app/App"
import { RequestStatus } from "@/common/types"


export type FilterValues = "all" | "active" | "completed"


export type DomainTodolist = Todolist & {
  filter: FilterValues
  entityStatus: RequestStatus
}