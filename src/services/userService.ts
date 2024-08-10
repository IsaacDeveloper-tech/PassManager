import { DataManager } from "./dataService";
import { User } from "../models/User";

export class UserDataManager{
    public constructor(
        public dataUserManager:DataManager,
        private nameTable:string
    ){
        nameTable = "user"
    }

    /////////////////////////////////
    //// GETTERS of USERS TABLE /////
    /////////////////////////////////
    public getAllUsers():Promise<User[]>
    {
        return this.dataUserManager.getAllData<User>(this.nameTable);
    }

    public getUserById(userId:number):Promise<User|null>
    {
        return this.dataUserManager.getDataById<User>(this.nameTable, userId)
    }

    public getUserByNick(userNick:string):Promise<User|null>
    {
        return this.dataUserManager.getDataByParam<User>(
            this.nameTable,
            "name",
            userNick
        );
    }

    /////////////////////////////////
    //// SETTERS of USERS TABLE /////
    /////////////////////////////////
    public setUser(userToInsert:User):Promise<boolean>
    {
        return this.dataUserManager.setData<User>(this.nameTable, userToInsert);
    }

    public deleteUser(userId:number):Promise<boolean>
    {
        return this.dataUserManager.deleteById<User>(this.nameTable, userId);
    }

    public updateUser(userId:number, userUpdated:User):Promise<boolean>
    {
        return this.dataUserManager.updateById<User>(
            this.nameTable,
            userId,
            userUpdated
        );
    }
};