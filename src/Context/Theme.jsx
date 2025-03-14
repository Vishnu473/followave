import React, { useContext, createContext, useEffect, useState } from "react";

export const ThemeContext = createContext({
  theme: "light",
  lightTheme: () => {},
  darkTheme: () => {},
  defaultTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const getStoredTheme = () => localStorage.getItem("theme");

  const getSystemDefaultTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  const [theme, setTheme] = useState(
    getStoredTheme() || getSystemDefaultTheme()
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.querySelector("html").classList.remove("dark", "light");
    document.querySelector("html").classList.add(theme);
  }, [theme]);

  const lightTheme = () => setTheme("light");

  const darkTheme = () => setTheme("dark");

  const defaultTheme = () => setTheme(getSystemDefaultTheme());

  useEffect(() => {
    document.querySelector("html").classList.remove("dark", "light");
    document.querySelector("html").classList.add(theme);
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme:dark)");

    const handleThemeChange = () => {
      setTheme(mediaQuery.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleThemeChange);

    return () => mediaQuery.removeEventListener("change", handleThemeChange);
  }, []);

  return (
    <ThemeContext.Provider
      value={{ theme, lightTheme, darkTheme, defaultTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
