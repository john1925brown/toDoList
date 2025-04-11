import { getListItemSx } from "@/common/styles"
import { ChangeEvent } from "react"
import Checkbox from "@mui/material/Checkbox"
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan"
import IconButton from "@mui/material/IconButton"
import { useAppDispatch } from "@/common/hooks"
import { ListItem } from "@mui/material"
import { updateTaskTC } from "../../../../../model/tasks-slice"
import DeleteIcon from "@mui/icons-material/Delete"
import { TaskStatus } from "@/common/enums/enums"
import { useDeleteTaskMutation, useUpdateTaskMutation } from "@/features/todolists/api/tasksApi"
import { DomainTask } from "@/features/todolists/api/tasksApi.types"
import { createTaskModel } from "@/features/todolists/lib/utils/createTaskModel"

type Props = {
  task: DomainTask
  todolistId: string
  disabled?: boolean
}

export const TaskItem = ({ task, todolistId, disabled }: Props) => {
  const [deleteTask] = useDeleteTaskMutation()
  const [updateTask] = useUpdateTaskMutation()

  const isTaskCompleted = task.status === TaskStatus.Completed

  const deleteTaskHandler = () => {
    deleteTask({ todolistId, taskId: task.id })
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    const model = createTaskModel(task, { status })
    console.log(e.currentTarget.checked )
    updateTask({ todolistId, taskId: task.id, model })
  }

  const changeTaskTitleHandler = (title: string) => {
    const model = createTaskModel(task, { title })

    updateTask({ todolistId, taskId: task.id, model })
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
