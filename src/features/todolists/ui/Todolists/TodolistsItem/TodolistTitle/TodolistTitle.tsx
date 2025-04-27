import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan"
import { IconButton } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import s from "./TodolistTitle.module.css"
import {
  useDeleteTodolistMutation,
  useUpdateTodolistTitleMutation,
} from "@/features/todolists/api/todolistsApi"
import { DomainTodolist } from "../../lib/types"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title } = todolist
  const [deleteTodolist] = useDeleteTodolistMutation()
  const [updateTodolistTitle] = useUpdateTodolistTitleMutation()

  const deleteTodolistHandler = () => {
    deleteTodolist(id)
  }

  const changeTodolistTitleHandler = (title: string) => {
    updateTodolistTitle({ id, title })
  }

  return (
    <div className={s.container}>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
      </h3>
      <IconButton onClick={deleteTodolistHandler}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
