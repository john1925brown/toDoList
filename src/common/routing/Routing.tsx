import { Route, Routes } from "react-router"
import { PageNotFound } from "../components"
import { Main } from "@/features/todolists/model/MainApp"
import { Login } from "@/features/auth/ui/login/Login"
import { ProtectedRoute } from "../components/ProtectedRoute/ProtectedRoute"
import { useAppSelector } from "../hooks"
import { selectIsLoggedIn } from "@/app/app-slice"

export const Path = {
  Main: "/",
  Login: "/login",
  NotFound: "*",
} as const

export const Routing = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  return (
    <Routes>
      <Route element={<ProtectedRoute isAllowed={isLoggedIn} />}>
        <Route path={Path.Main} element={<Main />} />
      </Route>

      <Route element={<ProtectedRoute isAllowed={!isLoggedIn} redirectPath={Path.Main} />}>
        <Route path={Path.Login} element={<Login />} />
      </Route>

      <Route path={Path.Login} element={<Login />} />
      <Route path={Path.NotFound} element={<PageNotFound />} />
    </Routes>
  )
}
