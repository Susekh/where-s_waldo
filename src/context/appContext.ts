import { createContext, useContext } from "react";
import { SetStateAction, Dispatch } from "react";

interface AppContextType {
  logoutBtn: boolean;
  setLogoutBtn: Dispatch<SetStateAction<boolean>>;
  charArr: string[];
  setCharArr: Dispatch<SetStateAction<string[]>>;
  gameTime: number;
  setGameTime: Dispatch<SetStateAction<number>>;
}

export const appContext = createContext<AppContextType>({
  logoutBtn: false,
  setLogoutBtn: () => {},
  charArr: [],
  setCharArr: () => {},
  gameTime: 0,
  setGameTime: () => {},
});

export const useApp = () => {
  return useContext(appContext);
};

export const AppProvider = appContext.Provider;
