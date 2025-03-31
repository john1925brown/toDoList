import { Route, Routes } from "react-router"
import { PageNotFound } from "../components"
import { Main } from "@/features/todolists/model/MainApp"
import { Login } from "@/features/auth/ui/login/Login"

export const Path = {
  Main: "/",
  Login: "login",
  NotFound: "*",
} as const

export const Routing = () => (
  <Routes>
    <Route path={Path.Main} element={<Main />} />
    <Route path={Path.Login} element={<Login />} />
    <Route path={Path.NotFound} element={<PageNotFound />} />
  </Routes>
)
