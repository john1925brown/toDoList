import { useAppDispatch } from "@/common/hooks"
import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm"
import { createTodolistAC } from "@/app/features/todolists/model/todolists-slice"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid2"
import { Todolists } from "../ui/Todolists/Todolists"

export const Main = () => {
  const dispatch = useAppDispatch()

  const createTodolist = (title: string) => {
    dispatch(createTodolistAC(title))
  }

  return (
    <Container maxWidth={"lg"}>
      <Grid container sx={{ mb: "30px" }}>
        <CreateItemForm onCreateItem={createTodolist} />
      </Grid>
      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  )
}
