import { ThemeProvider } from "next-themes"
import { Provider } from "react-redux"
import store from "../redux/store"
import "../styles/globals.css"
import "../styles/checkbox.css"
import NextNProgress from "nextjs-progressbar"

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider enableSystem={true} attribute="class">
        <NextNProgress />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
