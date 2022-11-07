import RedirectProvider from "../components/RedirectContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <RedirectProvider>
      <Component {...pageProps} />
    </RedirectProvider>
  );
}

export default MyApp;
