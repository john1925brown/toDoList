import { FilterBtns } from "./FilterBtns/FilterBtns"
import { Tasks } from "./Tasks/Tasks"
import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { DomainTodolist } from "../../../model/todolists-slice"
import { useAddTaskMutation } from "@/features/todolists/api/tasksApi"

type Props = {
  todolist: DomainTodolist
}

export const TodolistItem = ({ todolist }: Props) => {
  const { id, entityStatus } = todolist
  const [addTask] = useAddTaskMutation()

  const createTaskHandler = (title: string) => {
    addTask({ todolistId: id, title })
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
