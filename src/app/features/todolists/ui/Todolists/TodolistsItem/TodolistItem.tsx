import { useAppDispatch } from "@/common/hooks"
import { FilterBtns } from "./FilterBtns/FilterBtns"
import { Tasks } from "./Tasks/Tasks"
import { createTaskAC } from "../../../model/tasks-slice"
import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { DomainTodolist } from "../../../model/todolists-slice"

type Props = {
  todolist: DomainTodolist
}

export const TodolistItem = ({ todolist }: Props) => {
  const { id } = todolist

  const dispatch = useAppDispatch()

  const createTaskHandler = (title: string) => {
    dispatch(createTaskAC({ todolistId: id, title }))
  }

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <CreateItemForm onCreateItem={createTaskHandler} />
      <Tasks todolist={todolist} />
      <FilterBtns todolist={todolist} />
    </div>
  )
}
