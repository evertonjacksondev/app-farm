import { Fragment } from "react"
import { Router } from "./routers/Router"
import { SnackbarProvider } from "notistack"


const App = () => {


  return (
    <Fragment>
      <SnackbarProvider maxSnack={2} autoHideDuration={2000}>
      <Router />
      </SnackbarProvider>
    </Fragment>
  )
}

export default App
