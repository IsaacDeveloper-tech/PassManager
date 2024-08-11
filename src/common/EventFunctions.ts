import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native" 
import { User } from "../models/User";
import { UserDataManager } from "../services/userService";
import { ValidationFunctions } from "./ValidationFunctions";


export namespace EventFunctions
{
    // functions
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

    export function onClickLogIn(nickOfUser:string, passwordInput:string, userData:UserDataManager):void
    {
        ValidationFunctions.userExist(nickOfUser, userData)
        .then((userExist:boolean) => {
            if(!userExist)
                throw new Error("El usuario no existe");
                
            return userData.getUserByNick(nickOfUser);
        })
        .then((userLogged:User|null) => {
            if (userLogged === null)
                throw new Error("No se ha podido encontrar el usuario");

            return ValidationFunctions.userLoggedWithCorrectPass(passwordInput, userLogged);
        })
        .then((loggedCorrectly:boolean) => {
            if(!loggedCorrectly)
                throw new Error("El usuario no se ha loggeado correctamente");

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
