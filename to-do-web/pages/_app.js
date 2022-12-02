import DarkModeProvider from "../components/DarkModeContext"
import RedirectProvider from "../components/RedirectContext"
import { Provider } from "react-redux";
import store from "../redux/store"
;import "../styles/globals.css"
import "../styles/checkbox.css"

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
        <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
