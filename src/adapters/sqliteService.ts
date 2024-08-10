import * as SQLite from "expo-sqlite/next";
import bddConfig from "../config/bdd/bdd.json";
import { Manageable } from "../interfaces/Manageable/Manageable";

export class SQLiteManager implements Manageable
{
    private dataBase: SQLite.SQLiteDatabase;

    public constructor(
    )
    {
        this.dataBase = SQLite.openDatabaseSync(bddConfig.name);
        
        this.dataBase.execAsync(`
            ${bddConfig.initCommand}
        `);
    }

    
    public getAll<T>(nameTable:string):Promise<T[]>
    {
        return this.dataBase.getAllAsync<T>(nameTable);
    }

    public getById<T>(nameTable:string, id:number):Promise<T|null>
    {
        return this.dataBase.prepareAsync(
            `
            SELECT *
            FROM ${nameTable}
            WHERE id = ${id};
            `
        )
        .then((response: SQLite.SQLiteStatement) => {
            return response.executeAsync<T>();
        })
        .then((response: SQLite.SQLiteExecuteAsyncResult<T>) => {
            return response.getFirstAsync();
        })
        .catch(error => {
            throw new Error();
        });
    }

    public getByParam<T>(
        nameTable:string, 
        nameOfParam:string, 
        value:string):Promise<T|null>
    {
        return this.dataBase.prepareAsync(
            `
            SELECT *
            FROM ${nameTable}
            WHERE ${nameOfParam} = '${value}';
            `
        )
        .then((response: SQLite.SQLiteStatement) => {
            return response.executeAsync<T>();
        })
        .then((response: SQLite.SQLiteExecuteAsyncResult<T>) => {
            return response.getFirstAsync();
        })
        .catch(error => {
            throw new Error();
        }); 
    }

    public setData<T>(nameTable:string, valuesOfData:string):Promise<boolean>
    {
        return this.dataBase.prepareAsync(
            `
            INSERT INTO ${nameTable} VALUES (null,${valuesOfData});
            `
        )
        .then((response: SQLite.SQLiteStatement) => {
            return response.executeAsync<T>();
        })
        .then((response: SQLite.SQLiteExecuteAsyncResult<T>) => {
            return true;
        })
        .catch(error => {
            console.log(error);
            return false;
        });
    }

    public deleteById<T>(nameTable:string, id:number):Promise<boolean>
    {
        return this.dataBase.prepareAsync(
            `
            DELETE FROM ${nameTable} WHERE id = ${id};
            `
        )
        .then((response: SQLite.SQLiteStatement) => {
            return response.executeAsync<T>();
        })
        .then((response: SQLite.SQLiteExecuteAsyncResult<T>) => {
            return true;
        })
        .catch(error => {
            throw new Error();
        });
    }

    public updateById<T>(
        nameTable:string, 
        id:number, 
        valuesOfData:string
    ):Promise<boolean>
    {
        return this.dataBase.prepareAsync(
            `
            UPDATE ${nameTable}
            SET ${valuesOfData}
            WHERE id = ${id}
            `
        )
        .then((response: SQLite.SQLiteStatement) => {
            return response.executeAsync<T>();
        })
        .then((response: SQLite.SQLiteExecuteAsyncResult<T>) => {
            return true;
        })
        .catch(error => {
            throw new Error();
        });
    }

}