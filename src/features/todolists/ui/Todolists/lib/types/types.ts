import {  Todolist } from "@/app/App"


export type FilterValues = "all" | "active" | "completed"


export type DomainTodolist = Todolist & {
  filter: FilterValues

}