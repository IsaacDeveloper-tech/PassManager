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

}