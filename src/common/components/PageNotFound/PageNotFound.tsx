import styles from "./PageNotFound.module.css"
import { Path } from "@/common/routing/Routing"
import { Button } from "@mui/material"
import { Link } from "react-router"

export const PageNotFound = () => (
  <>
    <h1 className={styles.title}>404</h1>
    <h2 className={styles.subtitle}>page not found</h2>

    <Button component={Link} to={`${Path.Login}`}>
      Return to login page
    </Button>
  </>
)
