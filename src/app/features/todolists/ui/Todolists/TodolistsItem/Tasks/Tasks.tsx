import { List } from "@mui/material"
import { selectTasks } from "../../../../model/tasks-selectors"
import { useAppSelector } from "@/common/hooks"
import { Todolist } from "@/app/App"
import { TaskItem } from "./TaskItem/Task"

type Props = {
  todolist: Todolist
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
      {filteredTasks.length === 0 ? (
        <p>There are no tasks</p>
      ) : (
        <List>
          {filteredTasks.map((task) => {
            return <TaskItem key={task.id} task={task} todolistId={id} />
          })}
        </List>
      )}
    </>
  )
}
