import { createRoot } from "react-dom/client"
import "./index.css"
import { App } from "./app/App"
import { Provider } from "react-redux"
import { HashRouter } from "react-router"
import { store } from "./app/store"

createRoot(document.getElementById("root")!).render(
  <>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </>,
)
