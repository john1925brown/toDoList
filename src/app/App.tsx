import "./App.css"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { getTheme } from "@/common/theme"
import { Header } from "@/common/components/Header/Header"
import { selectThemeMode } from "./app-slice"
import { useEffect } from "react"
import { ErrorSnackbar } from "@/common/components/ErrorSnackbar/ErrorSnackbar"
import { Routing } from "@/common/routing"
import { DomainTask } from "@/features/todolists/api/tasksApi.types"
import { fetchTodolistsTC } from "@/features/todolists/model/todolists-slice"

export type Todolist = {
  id: string
  title: string
  filter: FilterValues
}

export type FilterValues = "all" | "active" | "completed"

export type TasksState = Record<string, DomainTask[]>

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)

  const theme = getTheme(themeMode)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <div className={"app"}>
        <CssBaseline />
        <Header />
        <Routing />
        <ErrorSnackbar />
      </div>
    </ThemeProvider>
  )
}
