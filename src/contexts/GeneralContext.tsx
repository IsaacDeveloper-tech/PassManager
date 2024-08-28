import React, { useState } from "react";
import { IGeneralContext } from "../interfaces/contexts/IGeneralContext";
import { SQLiteManager } from "../adapters/sqliteService";
import { DataManager } from "../services/dataService";
import { UserDataManager } from "../services/userService";
import { User } from "../models/User";

import { 
    MD3LightTheme as DefaultTheme,   
    PaperProvider 
} from 'react-native-paper';
import { lightTheme, darkTheme } from "../styles/themes.styles";

const sqliteManager:SQLiteManager = new SQLiteManager();

const dataManagerForUsers:DataManager = new DataManager(sqliteManager); 
const userData:UserDataManager = new UserDataManager(dataManagerForUsers,"users");


export const GeneralContext:React.Context<IGeneralContext> = React.createContext<IGeneralContext>({} as IGeneralContext);

export const GeneralContextProvider:React.FC<{children:React.ReactNode}> = ({children}) => {
    const [userLogged, setUserLogged] = useState<User | null>(null);
    const [userIsLogged, setUserIsLogged] = useState<boolean>(false);
    const [darkMode, setDarkMode] = useState<boolean>(true);
    
    const theme = {
        ...DefaultTheme,
        colors: darkMode ? darkTheme.colors : lightTheme.colors
    };

    const generalContext:IGeneralContext = {
            userState: {
            userLogged,
            setUserLogged,
            
            userIsLogged,
            setUserIsLogged
        },
        userData,
        setDarkMode
    };

    return (
        <GeneralContext.Provider value={generalContext}>
            <PaperProvider theme={theme}>
                {children}
            </PaperProvider>
        </GeneralContext.Provider>
    );
};