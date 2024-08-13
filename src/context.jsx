import { createContext, useContext, useEffect } from "react";
import useFetch from "./hooks/use-fetch";
import { getCurrentUser } from "./db/apiAuth";

const Urlcontext = createContext();

const UrlProvider = ({ children }) => {
  const { data: user, loading, fn: fetchUser } = useFetch(getCurrentUser);

  const isAuthenticated = user?.role === "authenticated";

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <Urlcontext.Provider value={{ user, fetchUser, loading, isAuthenticated }}>
      {children}
    </Urlcontext.Provider>
  );
};

export const UrlState = () => {
  return useContext(Urlcontext);
};

export default UrlProvider;
