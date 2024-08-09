import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native" 
import { User } from "../models/User";
import { UserDataManager } from "../services/userService";


export namespace EventFunctions
{
    // functions
    export function onClickSignUp(newUser:User, userData:UserDataManager):void
    {
        userData.setUser(newUser);
    }
    
    export function onChangeValueOfInput(
        event:NativeSyntheticEvent<TextInputChangeEventData>,
        setValue:React.Dispatch<React.SetStateAction<string>>
    ):void
    {
        setValue(event.nativeEvent.text);
    };
}
