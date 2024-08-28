import { Insertable } from "../interfaces/Insertables/Insertables";
import { Updateable } from "../interfaces/Updateables/Updateables";

export class User implements Insertable, Updateable {
    constructor(
        public id:number,
        public name:string,
        public password:string,
        public passwordFile:string
    ){}

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
            if(key !== "id")
                allColumnsWithValues.push(`${key}= '${value}'`);
        }

        return allColumnsWithValues;
    }
};