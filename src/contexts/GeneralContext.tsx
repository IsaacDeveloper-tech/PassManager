import React from "react";
import { IGeneralContext } from "../interfaces/contexts/IGeneralContext";
import { SQLiteManager } from "../adapters/sqliteService";
import { DataManager } from "../services/dataService";
import { UserDataManager } from "../services/userService";


export const GeneralContext:React.Context<IGeneralContext|null> = React.createContext<IGeneralContext|null>(null);

export const GeneralContextProvider:React.FC<{children:React.ReactNode}> = ({children}) => {

    const sqliteManager:SQLiteManager = new SQLiteManager();
    const dataManagerForUsers:DataManager = new DataManager(sqliteManager); 

    const userData:UserDataManager = new UserDataManager(dataManagerForUsers,"users");

    const generalContext:IGeneralContext = {
        userData
    }

    return (
        <GeneralContext.Provider value={generalContext}>
            {children}
        </GeneralContext.Provider>
    );
};