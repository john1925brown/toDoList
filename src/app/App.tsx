import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { getTheme } from "@/common/theme"
import { Header } from "@/common/components/Header/Header"
import { selectThemeMode, setIsLoggedIn } from "./app-slice"
import { useEffect, useState } from "react"
import { ErrorSnackbar } from "@/common/components/ErrorSnackbar/ErrorSnackbar"
import { Routing } from "@/common/routing"
import { DomainTask } from "@/features/todolists/api/tasksApi.types"
import CircularProgress from "@mui/material/CircularProgress"
import styles from "./App.module.css"
import { useMeQuery } from "@/features/auth/api/authApi"
import { ResultCode } from "@/common/enums/enums"
import { FilterValues } from "@/features/todolists/ui/Todolists/lib/types"

export type Todolist = {
  id: string
  title: string
  filter: FilterValues
}


export type TasksState = Record<string, DomainTask[]>

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const [isInitialized, setIsInitialized] = useState(false)
  const { data } = useMeQuery()
  const theme = getTheme(themeMode)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (data) {
      if (data.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
      }
      setIsInitialized(true)
    }
  }, [data])

  if (!isInitialized) {
    return (
      <div className={styles.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} />
      </div>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.app}>
        <CssBaseline />
        <Header />
        <Routing />
        <ErrorSnackbar />
      </div>
    </ThemeProvider>
  )
}
