import { List } from "@mui/material"
import { useAppSelector } from "@/common/hooks"
import { TaskItem } from "./TaskItem/Task"
import { useEffect } from "react"
import { TaskStatus } from "@/common/enums/enums"
import { DomainTodolist } from "@/features/todolists/model/todolists-slice"
import { useGetTasksQuery } from "@/features/todolists/api/tasksApi"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist
  const entityStatus = useAppSelector((state) => state.app.status)
  const { data } = useGetTasksQuery(id)

  useEffect(() => {}, [])

  let filteredTasks = data?.items
  if (filter === "active") {
    filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.New)
  }
  if (filter === "completed") {
    filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.Completed)
  }

  return (
    <>
      {filteredTasks && filteredTasks.length === 0 ? (
        <p>There are no tasks</p>
      ) : (
        <List>
          {filteredTasks &&
            filteredTasks.map((task) => {
              return <TaskItem key={task.id} task={task} todolistId={id} disabled={entityStatus === "loading"} />
            })}
        </List>
      )}
    </>
  )
}
