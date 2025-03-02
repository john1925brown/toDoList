import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { FilterValues } from "@/app/App"
import { useAppDispatch } from "@/common/hooks"
import { changeTodolistFilterAC, DomainTodolist } from "../../../../model/todolists-slice"
import { containerSx } from "@/common/styles"

type Props = {
  todolist: DomainTodolist
}

export const FilterBtns = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const dispatch = useAppDispatch()

  const changeFilterHandler = (filter: FilterValues) => {
    dispatch(changeTodolistFilterAC({ id: id, filter }))
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
