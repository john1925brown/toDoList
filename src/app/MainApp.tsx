import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid2"
import { Todolists } from "../features/todolists/ui/Todolists/Todolists"
import { useCreateTodolistMutation } from "../features/todolists/api/todolistsApi"

export const Main = () => {
  const [createTodolist] = useCreateTodolistMutation()

  const createTodolistHandler = (title: string) => {
    createTodolist(title)
  }

  return (
    <Container maxWidth={"lg"}>
      <Grid container sx={{ mb: "30px" }}>
        <CreateItemForm onCreateItem={createTodolistHandler} />
      </Grid>
      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  )
}
