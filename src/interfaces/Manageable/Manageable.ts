export interface Manageable
{
    getAll<T>(nameTable:string):Promise<T[]>;
    getById<T>(nameTable:string, id:number):Promise<T|null>;
    
    deleteById<T>(nameTable:string, id:number):Promise<boolean>;
    updateById<T>(nameTable:string, id:number, valuesOfData:string):Promise<boolean>;
    setData<T>(nameTable:string, valuesOfData:string):Promise<boolean>;
}