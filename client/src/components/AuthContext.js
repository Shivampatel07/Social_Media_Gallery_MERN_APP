// AuthContext.js
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(false);
  const [cookies, setCookie] = useCookies(["token"]);
  useEffect(() => {
    axios
      .post("http://localhost:8080/api/auth/userdata", { token: cookies.token })
      .then((res) => {
        if (res.data.username) {
          setIsLoggedIn(res.data);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((err) => {});
  }, [user]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, setUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
