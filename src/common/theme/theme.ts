import { createTheme } from "@mui/material"
import { ThemeMode } from "@/app/app-slice"

export const getTheme = (themeMode: ThemeMode) => {
  return createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: "#087EA4",
      },
    },
  })
}
