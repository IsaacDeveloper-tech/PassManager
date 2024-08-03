import { Insertable } from "../interfaces/Insertables/Insertables";
import { Updateable } from "../interfaces/Updateables/Updateables";

export class User implements Insertable, Updateable {
    constructor(
        private id:number,
        private name:string,
        private password:string,
        private passwordFile:string
    ){}

    // getters
    public get userId():number
    {
        return this.id;
    }

    public get userName():string
    {
        return this.name;
    }

    public get userPassword():string
    {
        return this.password;
    }

    public get userPasswordFile():string
    {
        return this.passwordFile;
    }

    // setters
    public set userId(id:number)
    {
        this.id = id;
    }

    public set userName(name:string)
    {
        this.name = name;
    }

    public set userPassword(password:string)
    {
        this.password = password;
    }

    public set userPasswordFile(passwordFile:string)
    {
        this.passwordFile = passwordFile;
    }

    // Interface implements
    public getColumnsOfDataObject(): string[] {
        const allColumns:string[] = [];

        for(let column in this)
        {
            allColumns.push(column);
        }

        return allColumns;
    }

    public getValuesOfDataObject(): string[] {
        const allValues:string[] = [];

        // I don't need id because it's autoincreased
        allValues.push(this.name);
        allValues.push(this.password);
        allValues.push(this.passwordFile);

        return allValues;
    }

    public getColumnsWithValues(): string[] 
    {
        const allColumnsWithValues:string[] = [];

        for (const [key, value] of Object.entries(this)) {
            allColumnsWithValues.push(`${key}= ${value}`);
        }

        return allColumnsWithValues;
    }
};