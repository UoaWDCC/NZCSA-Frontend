import React from "react";

const AuthContext = React.createContext(null);

export const AuthProvider = ({ user, children }) => {
  const [currentUser, setCurrentUser] = React.useState(user);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
