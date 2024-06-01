import React from "react";
import { FlatList } from "react-native";
import { PasswordItem } from "./PasswordItem";
import { Password } from "../services/passwordService";

type Props = {
    passwords:Password[],
    onPressItem:Function
}

export const PasswordList: React.FC<Props> = ({ passwords, onPressItem}) =>
{
    return(
        <FlatList 
            data={passwords} 
            renderItem={
                ({ item }) => <PasswordItem password={item} onPress={() => onPressItem(item)} />
            }
            keyExtractor={item => item.id.toString()} />
    );
};