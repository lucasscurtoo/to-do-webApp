import { Provider } from "react-redux";
import store from "../redux/store"
import { ThemeProvider } from 'next-themes';
;import "../styles/globals.css"
import "../styles/checkbox.css"

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider enableSystem={true} attribute="class">
        <Component {...pageProps} />
        </ThemeProvider>
    </Provider>
  )
}

export default MyApp
