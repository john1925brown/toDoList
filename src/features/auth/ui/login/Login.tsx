import { selectThemeMode, setIsLoggedIn } from "@/app/app-slice"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { getTheme } from "@/common/theme"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import Grid from "@mui/material/Grid2"
import TextField from "@mui/material/TextField"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import styles from "./Login.module.css"
import { zodResolver } from "@hookform/resolvers/zod"
import { Inputs, loginSchema } from "@/features/todolists/api/lib/schemas/LoginSchema"
import { useLazyGetCaptchaQuery, useLoginMutation } from "../../api/authApi"
import { ResultCode } from "@/common/enums/enums"
import { AUTH_TOKEN } from "@/common/contains"
import { useState } from "react"

export const Login = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const [login] = useLoginMutation()
  const dispatch = useAppDispatch()

  const [triggerGetCaptcha, { data: dataCaptcha }] = useLazyGetCaptchaQuery()
  const [isCaptchaRequired, setIsCaptchaRequired] = useState(false)

  const theme = getTheme(themeMode)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false, captcha: undefined },
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    login(data).then((res) => {
      if (res.data?.resultCode === ResultCode.CaptchaError) {
        setIsCaptchaRequired(true)
        triggerGetCaptcha()
      }
      if (res.data?.resultCode === ResultCode.Success) {
        localStorage.setItem(AUTH_TOKEN, res.data.data.token)
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
      }
    })
  }

  return (
    <Grid container justifyContent={"center"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel>
            <p>
              To login get registered
              <a
                style={{ color: theme.palette.primary.main, marginLeft: "5px" }}
                href="https://social-network.samuraijs.com"
                target="_blank"
                rel="noreferrer"
              >
                here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>
              <b>Email:</b> free@samuraijs.com
            </p>
            <p>
              <b>Password:</b> free
            </p>
          </FormLabel>
          <FormGroup>
            <TextField label="Email" margin="normal" {...register("email")} error={!!errors.email} />
            {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
            <TextField type="password" label="Password" margin="normal" {...register("password")} />
            {errors.password && <span className={styles.errorMessage}>{errors.password.message}</span>}
            {isCaptchaRequired && dataCaptcha && (
              <div>
                <img src={dataCaptcha.url} alt="captcha" />
                <TextField
                  type="text"
                  label="Write anti-bot symbols"
                  margin="normal"
                  {...register("captcha")}
                  error={!!errors.captcha}
                />
                {errors.captcha && <span className={styles.errorMessage}>{errors.captcha.message}</span>}
              </div>
            )}
            <FormControlLabel
              control={
                <Controller
                  name={"rememberMe"}
                  control={control}
                  render={({ field: { value, ...field } }) => <Checkbox {...field} checked={value} />}
                />
              }
              label="rememberMe"
            />

            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </Grid>
  )
}
