// ContextProvider.js
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const authContext = createContext();

function ContextProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null); // Clear user data on logout
  };

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      if (!token) {
        setUser(null);
        return;
      }

      try {
        const res = await axios.get("http://localhost:5050/api/auth/verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data.success) {
          setUser(res.data.user);
          // Update localStorage if user data changed on server
          localStorage.setItem("user", JSON.stringify(res.data.user));
        } else {
          logout(); // Clear user on unsuccessful verification
        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          logout(); // Clear user on 401 Unauthorized
        } else {
          console.log(err); // Log other errors
        }
      }
    };
    verifyUser();
  }, []);

  return (
    <authContext.Provider value={{ user, login, logout }}>
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(authContext);
};

export default ContextProvider;
