import { createContext } from "react";

const ThemeContext = createContext({
    isTheme: '',
    setIsTheme: () => {},
});

export default ThemeContext;

