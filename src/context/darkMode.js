import React, { useState, createContext } from "react";

export const DarkModeContext = createContext();

const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark" ? true : false || false
  );

  function handleChange() {
    if (!darkMode) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
    setDarkMode(!darkMode);
  }

  return (
    <DarkModeContext.Provider
      value={{
        darkMode,
        setDarkMode: handleChange,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
};

export default DarkModeProvider;
