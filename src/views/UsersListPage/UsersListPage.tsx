import { View, Button } from "react-native";
import { UserDataComponent } from "../../components/UserData/UserDataComponent";
import { GeneralContext } from "../../contexts/GeneralContext";
import { useContext, useEffect, useState } from "react";
import { IGeneralContext } from "../../interfaces/contexts/IGeneralContext";
import { User } from "../../models/User";
import { StackProps } from "../../components/Navigator/Navigator";

export function UsersListPage(stackProps:StackProps )
{
    const { userData } = useContext<IGeneralContext>(GeneralContext);

    const [ listOfUsers, setListOfUsers ] = useState<User[]>([]);

    useEffect(()=>{
        userData.getAllUsers()
        .then(users => {
            setListOfUsers(users);
        })
        .catch(error => {
            console.log(error);
        });
    }, []);

    return(
        <View>
            {listOfUsers.map(
                user => <UserDataComponent
                            key={ user.id } 
                            id={ user.id }
                            name = { user.name } 
                            stackValues={ stackProps }
                        />
            )}

            <Button
                title="Add new User"
                onPress={() => stackProps.navigation.navigate("RegisterPage")}
            />
        </View>
    );
}