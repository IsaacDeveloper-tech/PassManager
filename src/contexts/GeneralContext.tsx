import React, { useState } from "react";
import { IGeneralContext } from "../interfaces/contexts/IGeneralContext";
import { SQLiteManager } from "../adapters/sqliteService";
import { DataManager } from "../services/dataService";
import { UserDataManager } from "../services/userService";
import { User } from "../models/User";

const sqliteManager:SQLiteManager = new SQLiteManager();

const dataManagerForUsers:DataManager = new DataManager(sqliteManager); 
const userData:UserDataManager = new UserDataManager(dataManagerForUsers,"users");

export const GeneralContext:React.Context<IGeneralContext> = React.createContext<IGeneralContext>({} as IGeneralContext);

export const GeneralContextProvider:React.FC<{children:React.ReactNode}> = ({children}) => {
    const [userLogged, setUserLogged] = useState<User | null>(null);
    const [userIsLogged, setUserIsLogged] = useState<boolean>(false);

    const generalContext:IGeneralContext = {
            userState: {
            userLogged,
            setUserLogged,
            
            userIsLogged,
            setUserIsLogged
        },
        userData
    };

    return (
        <GeneralContext.Provider value={generalContext}>
            {children}
        </GeneralContext.Provider>
    );
};