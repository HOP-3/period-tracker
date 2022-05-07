import React, {createContext, useContext} from 'react';
import {Theme} from '../components/theme';
interface theme {
  children?: React.ReactNode;
}
const ThemeContext = createContext(Theme);

export const ThemeProvider: React.FC<theme> = ({children}) => (
  <ThemeContext.Provider value={Theme}>{children}</ThemeContext.Provider>
);

export const useTheme = () => useContext(ThemeContext);
