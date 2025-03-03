import { List } from "@mui/material"
import { useAppSelector } from "@/common/hooks"
import { TaskItem } from "./TaskItem/Task"
import { DomainTodolist } from "@/app/features/todolists/model/todolists-slice"
import { selectTasks } from "@/app/features/todolists/model/tasks-slice"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const { id } = todolist

  const tasks = useAppSelector(selectTasks)

  const todolistTasks = tasks[id]
  let filteredTasks = todolistTasks
  if (todolist.filter === "active") {
    filteredTasks = todolistTasks.filter((task) => !task.isDone)
  }
  if (todolist.filter === "completed") {
    filteredTasks = todolistTasks.filter((task) => task.isDone)
  }

  return (
    <>
      {filteredTasks && filteredTasks.length === 0 ? (
        <p>There are no tasks</p>
      ) : (
        <List>
          {filteredTasks &&
            filteredTasks.map((task) => {
              return <TaskItem key={task.id} task={task} todolistId={id} />
            })}
        </List>
      )}
    </>
  )
}
