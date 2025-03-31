import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid2"
import { Todolists } from "../ui/Todolists/Todolists"
import { createTodolistTC } from "./todolists-slice"
import { useNavigate } from "react-router"
import { selectIsLoggedIn } from "@/features/auth/model/authSlice"
import { useEffect } from "react"
import { Path } from "@/common/routing/Routing"

export const Main = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(Path.Login)
    }
  }, [isLoggedIn])

  const createTodolist = (title: string) => {
    dispatch(createTodolistTC({ title }))
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
