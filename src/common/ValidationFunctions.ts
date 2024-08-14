import { User } from "../models/User";
import { UserDataManager } from "../services/userService";

export namespace ValidationFunctions{

    export function sameValuesValidation(value1:string, value2:string):boolean 
    {
        return value1 === value2;
    }

    export function allInputsWithInfo(inputs:string[]):boolean
    {
        return !inputs.some((input) => input === "");
    }

    export function formatValidation(inputValue:string, format:RegExp):boolean
    {
        return inputValue.match(format) !== null;
    }

    export function userExist(
        nickOfUser:string, 
        userData:UserDataManager
    ):Promise<boolean>
    {
        return userData.getUserByNick(nickOfUser)
        .then(result => {
            return result !== null;
        })
        .catch(e=>{
            return true;
        }); 
    }

    export function userLoggedWithCorrectPass(passwordInput:string, userOfDB:User):boolean
    {
        return userOfDB.password === passwordInput;
    }
}