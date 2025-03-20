import { Login } from "@/app/features/auth/ui/login/Login"
import { Main } from "@/app/features/todolists/model/MainApp"
import { Route, Routes } from "react-router"
import { PageNotFound } from "../components"

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
