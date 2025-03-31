import { useAppSelector } from "@/common/hooks"
import Grid from "@mui/material/Grid2"
import Paper from "@mui/material/Paper"
import { TodolistItem } from "./TodolistsItem/TodolistItem"
import { selectTodolists } from "../../model/todolists-slice"

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists)

  return (
    <>
      {todolists.map((todolist) => {
        return (
          <Grid key={todolist.id}>
            <Paper sx={{ p: "0 20px 20px 20px" }}>
              <TodolistItem todolist={todolist} />
            </Paper>
          </Grid>
        )
      })}
    </>
  )
}
