import { IPassValues } from "../interfaces/PassValues/PassValues";

enum CharTypes{
    UNKNOWN,
    CHAR_MINUS,
    CHAR_MAYUS,
    SYMBOL,
    NUMBER
}

const charsMinus:string = "abcdefghijklmnopqrstuvwxyz";
const charsMayus:string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const symbols:string = "!\\\"#$%&'()*+,-./:;<=>?@[\\\\]^_`{|}~";

export class PassCreator{

    private passConfigurationCopy:IPassValues;
    
    public constructor(
        private passConfiguration:IPassValues
    ){
        if(!this.isValidConfig(passConfiguration))
            throw new Error("Invalid Password Configuration");

        this.passConfigurationCopy = {...this.passConfiguration}
    }

    public createPassword():string{
        let newPassword:string = "";

        for(let i:number = 0; i < this.passConfiguration.lenghtOfPass; i++){
            let typeOfChar:CharTypes = this.getTypeOfCharToPut();
            newPassword += this.getValueForPass(typeOfChar);
        }

        return newPassword;
    }

    public setConfiguration(newConfig:IPassValues){
        this.passConfiguration = newConfig;
    }

    private getValueForPass(charType:CharTypes):string{
        let newValue:string = "";

        switch(charType){
            case CharTypes.CHAR_MINUS:
                newValue = charsMinus[this.getRandomNumberBetween(0, charsMinus.length - 1)];
                break;
            case CharTypes.CHAR_MAYUS:
                newValue = charsMayus[this.getRandomNumberBetween(0, charsMayus.length - 1)];
                break;
            case CharTypes.NUMBER:
                newValue = this.getRandomNumberBetween(0, 9).toString();
                break;
            case CharTypes.SYMBOL:
                newValue = symbols[this.getRandomNumberBetween(0, symbols.length - 1)];
                break;
        }

        return newValue;
    }

    private getTypeOfCharToPut():CharTypes{
        let typeOk:boolean = false;
        let charType:CharTypes = CharTypes.UNKNOWN;
        
        while(!typeOk){
            charType = this.getRandomNumberBetween(CharTypes.CHAR_MINUS, CharTypes.NUMBER);
            
            if(!this.isAllConfigWrote()){
                typeOk = this.canPutThisCharType(charType);   
            }
            else{
                typeOk = true;
            }
        }

        return charType;
    }

    private canPutThisCharType(typeChar:CharTypes):boolean{
        let canPut:boolean = false;

        switch(typeChar){
            case CharTypes.CHAR_MINUS:
                if(this.passConfigurationCopy.numOfCharsMinus > 0){
                    canPut = true;
                    this.passConfigurationCopy.numOfCharsMinus--;
                }
                break;
            case CharTypes.CHAR_MAYUS:
                if(this.passConfigurationCopy.numOfCharsMayus > 0){
                    canPut = true;
                    this.passConfigurationCopy.numOfCharsMayus--;
                }
                break;
            case CharTypes.NUMBER:
                if(this.passConfigurationCopy.numOfNumbers > 0){
                    canPut = true;
                    this.passConfigurationCopy.numOfNumbers--;
                }
                break;
            case CharTypes.SYMBOL:
                if(this.passConfigurationCopy.numOfSymbols > 0){
                    canPut = true;
                    this.passConfigurationCopy.numOfSymbols--;
                }
                break;
        }

        return canPut;
    }

    private getRandomNumberBetween(min:number, max:number):number{
        return Math.floor(Math.random() * ((max + 1) - min) + min);
    }

    private isValidConfig(config:IPassValues):boolean{
        return config.lenghtOfPass >= config.numOfCharsMayus + config.numOfCharsMinus + config.numOfNumbers + config.numOfSymbols;
    }

    private isAllConfigWrote():boolean{
        return (
            this.passConfigurationCopy.numOfCharsMayus + 
            this.passConfigurationCopy.numOfCharsMinus + 
            this.passConfigurationCopy.numOfNumbers + 
            this.passConfigurationCopy.numOfSymbols) === 0
    }
}