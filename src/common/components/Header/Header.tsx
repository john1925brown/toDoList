import { AppBar, Toolbar, Container, IconButton, LinearProgress } from "@mui/material"
import Switch from "@mui/material/Switch"
import MenuIcon from "@mui/icons-material/Menu"
import { useDispatch } from "react-redux"
import { changeThemeModeAC, selectStatus, selectThemeMode } from "@/app/app-slice"
import { getTheme } from "@/common/theme"
import { useAppSelector } from "@/common/hooks"
import { NavButton } from "../NavButton/NavButton"
import { containerSx } from "@/common/styles"

export const Header = () => {
  const dispatch = useDispatch()
  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectStatus)

  const changeMode = () => {
    dispatch(changeThemeModeAC({ themeMode: themeMode === "light" ? "dark" : "light" }))
  }

  const theme = getTheme(themeMode)

  return (
    <AppBar position="static" sx={{ mb: "30px" }}>
      <Toolbar>
        <Container maxWidth={"lg"} sx={containerSx}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <div>
            <NavButton>Sign in</NavButton>
            <NavButton>Sign up</NavButton>
            <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
            <Switch color={"default"} onChange={changeMode} />
          </div>
        </Container>
      </Toolbar>
      {status === "loading" ? <LinearProgress /> : <></>}
    </AppBar>
  )
}
