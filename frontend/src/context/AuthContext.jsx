import { createContext, useState, useEffect, useContext } from "react";

// Create the AuthContext with default values
export const AuthContext = createContext({
  authUser: null,
  setAuthUser: () => {} // No-op function as a default placeholder
});

// AuthContextProvider Component
export const AuthContextProvider = ({ children }) => {
  // Initialize state from localStorage if available
  const [authUser, setAuthUser] = useState(() => {
    return JSON.parse(localStorage.getItem("current-user")) || null;
  });

  // Update localStorage whenever authUser changes
  useEffect(() => {
    localStorage.setItem("current-user", JSON.stringify(authUser));
  }, [authUser]);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
// export const useAuthContext = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuthContext must be used within an AuthContextProvider");
//   }
//   return context;
// };
