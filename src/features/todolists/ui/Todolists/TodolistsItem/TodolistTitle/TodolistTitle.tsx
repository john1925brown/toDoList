import { useAppDispatch } from "@/common/hooks"
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan"
import { IconButton } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import s from "./TodolistTitle.module.css"
import { changeTodolistTitleTC, deleteTodolistTC, DomainTodolist } from "@/features/todolists/model/todolists-slice"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title, entityStatus } = todolist

  const dispatch = useAppDispatch()

  const deleteTodolistHandler = () => {
    dispatch(deleteTodolistTC({ id: id }))
  }

  const changeTodolistTitleHandler = (title: string) => {
    dispatch(changeTodolistTitleTC({ id, title }))
  }

  return (
    <div className={s.container}>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitleHandler} disabled={entityStatus === "loading"} />
      </h3>
      <IconButton onClick={deleteTodolistHandler} disabled={entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
