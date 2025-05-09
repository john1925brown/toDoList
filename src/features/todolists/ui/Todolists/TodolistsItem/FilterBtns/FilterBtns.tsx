import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { useAppDispatch } from "@/common/hooks"
import { containerSx } from "@/common/styles"
import { todolistsApi } from "@/features/todolists/api/todolistsApi"
import { DomainTodolist, FilterValues } from "../../lib/types"

type Props = {
  todolist: DomainTodolist
}

export const FilterBtns = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const dispatch = useAppDispatch()

  const changeFilterHandler = (filter: FilterValues) => {
    dispatch(
      todolistsApi.util.updateQueryData("getTodolists", undefined, (data) => {
        const index = data.findIndex((todolist) => todolist.id === id)
        if (index !== -1) {
          data[index].filter = filter
        }
      }),
    )
  }
  return (
    <Box sx={containerSx}>
      <Button
        variant={filter === "all" ? "outlined" : "text"}
        color={"inherit"}
        onClick={() => changeFilterHandler("all")}
      >
        All
      </Button>
      <Button
        variant={filter === "active" ? "outlined" : "text"}
        color={"primary"}
        onClick={() => changeFilterHandler("active")}
      >
        Active
      </Button>
      <Button
        variant={filter === "completed" ? "outlined" : "text"}
        color={"secondary"}
        onClick={() => changeFilterHandler("completed")}
      >
        Completed
      </Button>
    </Box>
  )
}
