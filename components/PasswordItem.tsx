import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { Password } from "../services/passwordService";

export type Props = {
    password:Password,
    onPress:any // TODO: Esto sería una función pero hay que ver como importarla
}

export const PasswordItem:React.FC<Props> = ({password, onPress}) =>
{
    return(
        <Pressable onPress={onPress} style={styles.item}>
            <Text>{ password.name }</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    }
});