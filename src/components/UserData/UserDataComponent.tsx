import { StackProps } from "../Navigator/Navigator";
import { Pressable, Text } from "react-native";

type UserDataProps = {
    id: number,
    name:string
    stackValues: StackProps
};

export function UserDataComponent({ id, name, stackValues }:UserDataProps)
{
    return (
        <Pressable onTouchEnd={() => { 
            stackValues.navigation.navigate(
                "LoginPage", 
                {id, name}
            ) 
        }}>
            <Text>{name}</Text>
        </Pressable>
    );
}