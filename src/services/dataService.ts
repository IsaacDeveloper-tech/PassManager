import { Insertable } from "../interfaces/Insertables/Insertables";
import { Manageable } from "../interfaces/Manageable/Manageable";
import { Updateable } from "../interfaces/Updateables/Updateables";

export class DataManager{

    public constructor(
        private dataManager:Manageable
    ){}

    // Get data from DataBase

    public getAllData<T>(nameTable:string):Promise<T[]>
    {
        return this.dataManager.getAll<T>(nameTable);
    }

    public getDataById<T>(nameTable:string, id:number):Promise<T|null>
    {
        return this.dataManager.getById(nameTable, id);
    }

    // Set data from DataBase

    public setData<T>(nameTable:string, data:Insertable):Promise<boolean>
    {
        return this.dataManager.setData<T>(
            nameTable, 
            this.listOfStringToString(data.getValuesOfDataObject())
        );
    }

    public deleteById<T>(nameTable:string, id:number):Promise<boolean>
    {
        return this.dataManager.deleteById<T>(nameTable, id);
    }

    public updateById<T>(nameTable:string, id:number, data:Updateable):Promise<boolean>
    {
        return this.dataManager.updateById<T>(
            nameTable, 
            id,
            this.listOfColumnsAndValuesToString(data.getColumnsWithValues())
        );
    }

    // Utils
    private listOfStringToString(listOfString:string[]):string
    {
        let textTypesOfColumns:string = "";
        const MAX:number = listOfString.length;

        textTypesOfColumns += "(";

        for(let i:number = 0; i < MAX; i++)
        {
            textTypesOfColumns += `${listOfString[i]}`;

            if (i < MAX - 1)
                textTypesOfColumns += ",";
        }

        textTypesOfColumns += ")";

        return textTypesOfColumns;
    }

    private listOfColumnsAndValuesToString(listOfColumnsAndValues:string[]):string
    {
        let textOfColumnsAndValues:string = "";
        const MAX:number = listOfColumnsAndValues.length;

        for(let i:number = 0; i < MAX; i++)
        {
            textOfColumnsAndValues += `${listOfColumnsAndValues[i]}`;

            if (i < MAX - 1)
                textOfColumnsAndValues += ",";
        }

        return textOfColumnsAndValues;
    }
};