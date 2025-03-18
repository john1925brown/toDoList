import { SyntheticEvent } from "react"
import Alert from "@mui/material/Alert"
import Snackbar from "@mui/material/Snackbar"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { setAppError } from "@/app/app-slice"

export const ErrorSnackbar = () => {
  const error = useAppSelector((state) => state.app.error)
  const dispatch = useAppDispatch()

  const handleClose = (_event: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return
    }

    dispatch(setAppError({ error: null }))
  }

  return (
    <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: "100%" }}>
        {error}
      </Alert>
    </Snackbar>
  )
}
