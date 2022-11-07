import { createContext, useContext, useState } from "react";

const RedirectContext = createContext({
  redirected: {},
  setRedirectContext: () => {},
});

const RedirectProvider = ({ children }) => {
  const [redirect, setRedirect] = useState(false);

  return (
    <RedirectContext.Provider value={{ redirect, setRedirect }}>
      {children}
    </RedirectContext.Provider>
  );
};

export const useRedirect = () => useContext(RedirectContext);

export default RedirectProvider;
