import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native" 
import { User } from "../models/User";
import { UserDataManager } from "../services/userService";
import { ValidationFunctions } from "./ValidationFunctions";


export namespace EventFunctions
{
    // functions
    export function onClickSignUp(newUser:User, userData:UserDataManager):void
    {
        ValidationFunctions.userExist(newUser.userName, userData)
        .then((result)=>{
            if(result)
                throw new Error("Ya existe el usuario");
            else{
                return userData.setUser(newUser);
            }
        })
        .then(response => {
            console.log("Usuario creado correctamente");
        })
        .catch(e => {
            console.log(e);
        });
    }
    
    export function onChangeValueOfInput(
        event:NativeSyntheticEvent<TextInputChangeEventData>,
        setValue:React.Dispatch<React.SetStateAction<string>>
    ):void
    {
        setValue(event.nativeEvent.text);
    };
}
