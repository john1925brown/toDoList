import Grid from "@mui/material/Grid2"
import Paper from "@mui/material/Paper"
import { TodolistItem } from "./TodolistsItem/TodolistItem"
import { useGetTodolistsQuery } from "../../api/todolistsApi"
import { TodolistSkeleton } from "./TodolistsSkeleton/TodolistSkeleton"

export const Todolists = () => {
  const { data, isLoading } = useGetTodolistsQuery(undefined)

  if (isLoading) {
    return <TodolistSkeleton />
  }

  return (
    <>
      {data?.map((todolist) => {
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
