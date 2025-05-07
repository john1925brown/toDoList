import { List } from "@mui/material"
import { TaskItem } from "./TaskItem/Task"
import { TaskStatus } from "@/common/enums/enums"
import { useGetTasksQuery } from "@/features/todolists/api/tasksApi"
import { TasksSkeleton } from "./TasksSkeleton/TasksSkeleton"
import { DomainTodolist } from "../../lib/types"
import { useState } from "react"
import { TasksPagination } from "./TasksPagination/TasksPagination"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist
  const [page, setPage] = useState(1)
  const { data, isLoading } = useGetTasksQuery({ todolistId: id, params: { page } }, { refetchOnFocus: true })

  if (isLoading) {
    return <TasksSkeleton />
  }

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
        <>
          <List>
            {filteredTasks?.map((task) => {
              return <TaskItem key={task.id} task={task} todolistId={id} />
            })}
          </List>
          {data && data.totalCount > 4 ? (
            <TasksPagination totalCount={data?.totalCount || 0} page={page} setPage={setPage} />
          ) : (
            <></>
          )}
        </>
      )}
    </>
  )
}
