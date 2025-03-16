import { getListItemSx } from "@/common/styles"
import { ChangeEvent } from "react"
import Checkbox from "@mui/material/Checkbox"
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan"
import IconButton from "@mui/material/IconButton"
import { useAppDispatch } from "@/common/hooks"
import { ListItem } from "@mui/material"
import { changeTaskStatusTC, changeTaskTitleAC, deleteTaskTC } from "../../../../../model/tasks-slice"
import DeleteIcon from "@mui/icons-material/Delete"
import { DomainTask } from "@/app/features/todolists/api/tasksApi.types"
import { TaskStatus } from "@/common/enums/enums"

type Props = {
  task: DomainTask
  todolistId: string
}

export const TaskItem = ({ task, todolistId }: Props) => {
  const dispatch = useAppDispatch()

  const isTaskCompleted = task.status === TaskStatus.Completed

  const deleteTaskHandler = () => {
    dispatch(deleteTaskTC({ todolistId: todolistId, taskId: task.id }))
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New

    dispatch(
      changeTaskStatusTC({
        todolistId: todolistId,
        taskId: task.id,
        status: status,
      }),
    )
  }

  const changeTaskTitleHandler = (title: string) => {
    dispatch(
      changeTaskTitleAC({
        todolistId: todolistId,
        taskId: task.id,
        title: title,
      }),
    )
  }
  return (
    <ListItem sx={getListItemSx(isTaskCompleted)}>
      <div>
        <Checkbox checked={isTaskCompleted} onChange={changeTaskStatusHandler} />
        <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
      </div>
      <IconButton onClick={deleteTaskHandler}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
