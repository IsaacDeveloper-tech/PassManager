import { User } from "../models/User";
import { UserDataManager } from "../services/userService";

export namespace ValidationFunctions{

    export function repeatPasswordValidation(password:string, repeatedPassword:string):boolean 
    {
        return password === repeatedPassword;
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
}