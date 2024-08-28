import { StackProps } from "../Navigator/Navigator";
import { Button, Text, Card, Avatar} from "react-native-paper";
import { Pressable } from "react-native";

type UserDataProps = {
    id: number,
    name:string
    stackValues: StackProps
};

export function UserDataComponent({ id, name, stackValues }:UserDataProps)
{
    return (
        <Pressable onPress={() => stackValues.navigation.navigate(
            "LoginPage", 
            {id, name}
        )}
        style = {{marginBottom: 5}}>
            <Card>
                <Card.Title 
                    title = { name }
                    subtitle = "User" 
                    titleStyle = {{
                        fontSize: 20
                    }}
                    left={() => <Avatar.Icon size={35} icon = "account" />}
                />
            </Card>
        </Pressable>
    );
}