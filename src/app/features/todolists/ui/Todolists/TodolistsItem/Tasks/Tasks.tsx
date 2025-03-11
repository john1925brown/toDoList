import { List } from "@mui/material"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { TaskItem } from "./TaskItem/Task"
import { DomainTodolist } from "@/app/features/todolists/model/todolists-slice"
import { fetchTasksTC, selectTasks } from "@/app/features/todolists/model/tasks-slice"
import { useEffect } from "react"
import { TaskStatus } from "@/common/enums/enums"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const tasks = useAppSelector(selectTasks)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTasksTC(id))
  }, [])

  const todolistTasks = tasks[id]

  let filteredTasks = todolistTasks
  if (filter === "active") {
    filteredTasks = todolistTasks.filter((task) => task.status === TaskStatus.New)
  }
  if (filter === "completed") {
    filteredTasks = todolistTasks.filter((task) => task.status === TaskStatus.Completed)
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
