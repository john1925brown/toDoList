import { useAppDispatch } from "@/common/hooks"
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan"
import { IconButton } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import s from "./TodolistTitle.module.css"
import { DomainTodolist } from "@/features/todolists/model/todolists-slice"
import {
  todolistsApi,
  useDeleteTodolistMutation,
  useUpdateTodolistTitleMutation,
} from "@/features/todolists/api/todolistsApi"
import { RequestStatus } from "@/common/types"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title, entityStatus } = todolist
  const [deleteTodolist] = useDeleteTodolistMutation()
  const [updateTodolistTitle] = useUpdateTodolistTitleMutation()

  const dispatch = useAppDispatch()

  const changeTodolistStatus = (entityStatus: RequestStatus) => {
    dispatch(
      todolistsApi.util.updateQueryData("getTodolists", undefined, (data) => {
        const index = data.findIndex((todolist) => todolist.id === id)
        if (index !== -1) {
          data[index].entityStatus = entityStatus
        }
      }),
    )
  }

  const deleteTodolistHandler = () => {
    changeTodolistStatus("loading")
    deleteTodolist(id)
      .unwrap()
      .catch(() => {
        changeTodolistStatus("idle")
      })
  }

  const changeTodolistTitleHandler = (title: string) => {
    updateTodolistTitle({ id, title })
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
