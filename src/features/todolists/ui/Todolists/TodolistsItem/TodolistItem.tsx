import { useAppDispatch } from "@/common/hooks"
import { FilterBtns } from "./FilterBtns/FilterBtns"
import { Tasks } from "./Tasks/Tasks"
import { createTaskTC } from "../../../model/tasks-slice"
import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { DomainTodolist } from "../../../model/todolists-slice"

type Props = {
  todolist: DomainTodolist
}

export const TodolistItem = ({ todolist }: Props) => {
  const { id, entityStatus } = todolist

  const dispatch = useAppDispatch()

  const createTaskHandler = (title: string) => {
    dispatch(createTaskTC({ todolistId: id, title }))
  }

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <CreateItemForm onCreateItem={createTaskHandler} disabled={entityStatus === "loading"} />
      <Tasks todolist={todolist} />
      <FilterBtns todolist={todolist} />
    </div>
  )
}
