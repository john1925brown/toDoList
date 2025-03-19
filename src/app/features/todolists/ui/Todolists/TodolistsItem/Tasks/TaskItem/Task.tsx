import { getListItemSx } from "@/common/styles"
import { ChangeEvent } from "react"
import Checkbox from "@mui/material/Checkbox"
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan"
import IconButton from "@mui/material/IconButton"
import { useAppDispatch } from "@/common/hooks"
import { ListItem } from "@mui/material"
import { deleteTaskTC, updateTaskTC } from "../../../../../model/tasks-slice"
import DeleteIcon from "@mui/icons-material/Delete"
import { DomainTask } from "@/app/features/todolists/api/tasksApi.types"
import { TaskStatus } from "@/common/enums/enums"

type Props = {
  task: DomainTask
  todolistId: string
  disabled?: boolean
}

export const TaskItem = ({ task, todolistId, disabled }: Props) => {
  const dispatch = useAppDispatch()

  const isTaskCompleted = task.status === TaskStatus.Completed

  const deleteTaskHandler = () => {
    dispatch(deleteTaskTC({ todolistId: todolistId, taskId: task.id }))
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New

    dispatch(
      updateTaskTC({
        todolistId: todolistId,
        taskId: task.id,
        domainModel: { status: status ? TaskStatus.Completed : TaskStatus.New },
      }),
    )
  }

  const changeTaskTitleHandler = (title: string) => {
    dispatch(
      updateTaskTC({
        todolistId: todolistId,
        taskId: task.id,
        domainModel: { title },
      }),
    )
  }
  return (
    <ListItem sx={getListItemSx(isTaskCompleted)}>
      <div>
        <Checkbox disabled={disabled} checked={isTaskCompleted} onChange={changeTaskStatusHandler} />
        <EditableSpan disabled={disabled} value={task.title} onChange={changeTaskTitleHandler} />
      </div>
      <IconButton disabled={disabled} onClick={deleteTaskHandler}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
