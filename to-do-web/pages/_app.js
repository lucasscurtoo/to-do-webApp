import DarkModeProvider from "../components/DarkModeContext"
import RedirectProvider from "../components/RedirectContext"
import "../styles/globals.css"
import "../styles/checkbox.css"

function MyApp({ Component, pageProps }) {
  return (
    <RedirectProvider>
      <DarkModeProvider>
        <Component {...pageProps} />
      </DarkModeProvider>
    </RedirectProvider>
  )
}

export default MyApp
