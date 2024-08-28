import { View, ScrollView } from "react-native";
import { UserDataComponent } from "../../components/UserData/UserDataComponent";
import { GeneralContext } from "../../contexts/GeneralContext";
import { useContext, useEffect, useState } from "react";
import { IGeneralContext } from "../../interfaces/contexts/IGeneralContext";
import { User } from "../../models/User";
import { StackProps } from "../../components/Navigator/Navigator";
import { StyleSheet } from "react-native";

import { FAB, useTheme } from "react-native-paper";

export function UsersListPage(stackProps:StackProps )
{
    const { userData } = useContext<IGeneralContext>(GeneralContext);
    const theme = useTheme();

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
        <View style = {{ 
            backgroundColor: theme.colors.background,
            width: "100%",
            height: "100%"
        }}>
            <ScrollView style = {{
                overflow: "scroll",
                width: "80%",
                marginVertical: 100,
                marginHorizontal: "auto",
                padding: 10
            }}>
                {listOfUsers.map(
                    user => <UserDataComponent
                                key = { user.id } 
                                id = { user.id }
                                name = { user.name } 
                                stackValues={ stackProps }
                            />
                )}
            </ScrollView>

            <FAB
                icon={"plus"} 
                onPress={() => stackProps.navigation.navigate("RegisterPage")}
                style = {styles.fab}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    fab: {
      position: 'absolute',
      margin: 16,
      right: 50,
      bottom: 60,
    },
})