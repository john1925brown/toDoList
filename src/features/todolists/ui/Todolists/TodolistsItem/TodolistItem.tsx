import { FilterBtns } from "./FilterBtns/FilterBtns"
import { Tasks } from "./Tasks/Tasks"
import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { useCreateTaskMutation } from "@/features/todolists/api/tasksApi"
import { DomainTodolist } from "../lib/types"

type Props = {
  todolist: DomainTodolist
}

export const TodolistItem = ({ todolist }: Props) => {
  const { id} = todolist
  const [createTask] = useCreateTaskMutation()

  const createTaskHandler = (title: string) => {
    createTask({ todolistId: id, title })
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
