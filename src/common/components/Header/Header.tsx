import { AppBar, Toolbar, Container, IconButton, LinearProgress } from "@mui/material"
import Switch from "@mui/material/Switch"
import MenuIcon from "@mui/icons-material/Menu"
import { changeThemeModeAC, selectIsLoggedIn, selectStatus, selectThemeMode, setIsLoggedIn } from "@/app/app-slice"
import { getTheme } from "@/common/theme"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { NavButton } from "../NavButton/NavButton"
import { containerSx } from "@/common/styles"
import { useLogoutMutation } from "@/features/auth/api/authApi"
import { ResultCode } from "@/common/enums/enums"
import { AUTH_TOKEN } from "@/common/contains"

export const Header = () => {
  const dispatch = useAppDispatch()
  const [logout] = useLogoutMutation()
  const themeMode = useAppSelector(selectThemeMode)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const status = useAppSelector(selectStatus)
  const theme = getTheme(themeMode)

  const changeMode = () => {
    dispatch(changeThemeModeAC({ themeMode: themeMode === "light" ? "dark" : "light" }))
  }

  const logoutHandler = () => {
    logout().then((res) => {
      if (res.data?.resultCode === ResultCode.Success) {
        localStorage.removeItem(AUTH_TOKEN)
        dispatch(setIsLoggedIn({ isLoggedIn: false }))
      }
    })
  }

  return (
    <AppBar position="static" sx={{ mb: "30px" }}>
      <Toolbar>
        <Container maxWidth={"lg"} sx={containerSx}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <div>
            {isLoggedIn && <NavButton onClick={logoutHandler}>Logout</NavButton>}

            <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
            <Switch color={"default"} onChange={changeMode} />
          </div>
        </Container>
      </Toolbar>
      {status === "loading" ? <LinearProgress /> : <></>}
    </AppBar>
  )
}
