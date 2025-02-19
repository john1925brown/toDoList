import { ThemeMode } from "../../../app-reducer"
import { RootState } from "../../../store"

export const selectThemeMode = (state: RootState): ThemeMode => state.app.themeMode
