import { createContext, useContext } from "react";
import { SetStateAction} from "react";


export const appContext = createContext({
    logoutBtn : false,
    setLogoutBtn : (logout :  SetStateAction<boolean>) => {},
})


export const useApp = () => {
    return useContext(appContext)
} 

export const AppProvider = appContext.Provider