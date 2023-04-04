import { ThemeProvider } from "next-themes"
import { Provider } from "react-redux"
import { wrapper } from "../redux/store"
import "../styles/globals.css"
import "../styles/checkbox.css"
import NextNProgress from "nextjs-progressbar"

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <NextNProgress />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default wrapper.withRedux(MyApp)
