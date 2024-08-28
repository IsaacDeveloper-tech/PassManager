import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native" 
import { User } from "../models/User";
import { UserDataManager } from "../services/userService";
import { ValidationFunctions } from "./ValidationFunctions";
import { UserState } from "../interfaces/contexts/IGeneralContext";


export namespace EventFunctions
{
    // functions
    export function onClickDeleteUser(userState:UserState, userData:UserDataManager):void
    {
        userData.deleteUser(userState.userLogged?.id ?? 0)
        .then(operationOK => {
            if(!operationOK)
                throw new Error("Can't delete user");

            onClickLogOut(userState);
        })
        .catch(error => {
            console.log(error);
        })
    }

    export function onClickLogOut(userState:UserState):void
    {
        userState.setUserLogged(null);
        userState.setUserIsLogged(false);
    }

    export function onClickSaveChanges(id:number, userUpdated:User, userData:UserDataManager):Promise<boolean>
    {
        return userData.updateUser(id, userUpdated)
        .then((operationOK) => {
            return operationOK;
        })
        .catch(error => {
            console.log(error);
            return false;
        })
    }

    export function onClickSignUp(newUser:User, userData:UserDataManager):void
    {
        ValidationFunctions.userExist(newUser.name, userData)
        .then((userExist:boolean) => {
            if(userExist)
                throw new Error("Ya existe el usuario");

            return userData.setUser(newUser);
        })
        .then((operationOK:boolean) => {
            if(!operationOK)
                throw new Error("No se ha creado el usuario correctamente");

            console.log("Usuario creado correctamente");
        })
        .catch(e => {
            console.log(e);
        });
    }

    export function onClickLogIn(
        idUser:number,
        passwordInput:string, 
        userData:UserDataManager,
        setUserIsLogged:React.Dispatch<React.SetStateAction<User | null>>, 
        setUserLogged:React.Dispatch<React.SetStateAction<boolean>>
    ):void
    {
        userData.getUserById(idUser)
        .then((userLogged:User|null):[boolean, User] => {
            if (userLogged === null)
                throw new Error("No se ha podido encontrar el usuario");

            return [
                ValidationFunctions.userLoggedWithCorrectPass(passwordInput, userLogged),
                userLogged
            ];
        })
        .then(([loggedCorrectly, userLogged]) => {
            if(!loggedCorrectly)
                throw new Error("El usuario no se ha loggeado correctamente");

            setUserIsLogged(userLogged);
            setUserLogged(loggedCorrectly);
            
            console.log("El usuario se ha loggeado correctamente");
        })
        .catch(error => {
            console.log(error);
        })
    }
    
    export function onChangeValueOfInput(
        event:NativeSyntheticEvent<TextInputChangeEventData>,
        setValue:React.Dispatch<React.SetStateAction<string>>
    ):void
    {
        setValue(event.nativeEvent.text);
    };
}
