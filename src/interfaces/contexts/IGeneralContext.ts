import { UserDataManager } from "../../services/userService";
import { User } from "../../models/User";

export interface IGeneralContext{
    userState       : UserState
    userData        : UserDataManager;
    setDarkMode     : React.Dispatch<React.SetStateAction<boolean>>
};

export interface UserState{
    userLogged      : User | null;
    setUserLogged   : React.Dispatch<React.SetStateAction<User | null>>

    userIsLogged    : boolean;
    setUserIsLogged : React.Dispatch<React.SetStateAction<boolean>>
}