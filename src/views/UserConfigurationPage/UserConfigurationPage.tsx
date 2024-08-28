import { useContext, useState, useEffect } from "react";
import { View } from "react-native";
import { TextInput, Button, Text, Divider } from "react-native-paper";
import { GeneralContext } from "../../contexts/GeneralContext";
import { EventFunctions } from "../../common/EventFunctions";
import { ValidationFunctions } from "../../common/ValidationFunctions";
import { User } from "../../models/User";


export function UserConfigurationPage()
{
    const { userState, userData } = useContext(GeneralContext);

    const [newNickName, setNewNickName] = useState<string>("");
    const [passwordUser, setPasswordUser] = useState<string>("");
    const [newPaswordUser, setNewPasswordUser] = useState<string>("");

    const [passwordOtherActions, setPasswordOtherActions] = useState<string>("");

    const [validated, setValidated] = useState<boolean>(false);
    const [validatedOtherActions, setValidatedOtherActions] = useState<boolean>(false);

    useEffect(() => {
        setValidated(
            ValidationFunctions.allInputsWithInfo([newNickName, passwordUser, newPaswordUser]) &&
            !ValidationFunctions.sameValuesValidation(passwordUser, newPaswordUser) &&
            ValidationFunctions.sameValuesValidation(passwordUser, userState.userLogged?.password ?? "")
        );
    },[newNickName, passwordUser, newPaswordUser]);

    useEffect(() => {
        setValidatedOtherActions(
            ValidationFunctions.allInputsWithInfo([passwordOtherActions]) &&
            ValidationFunctions.sameValuesValidation(userState.userLogged?.password ?? "", passwordOtherActions)
        );
    }, [passwordOtherActions]);

    const createUserUpdated:()=>void = () => {

        const userUpdated:User = new User(
            userState.userLogged?.id ?? 0,
            newNickName,
            newPaswordUser,
            `${newNickName}.pwds`
        );

        EventFunctions.onClickSaveChanges(userUpdated.id, userUpdated, userData)
        .then((operationOK) => {
            if(!operationOK)
                throw new Error("UserDon't updated correctly");

            userState.setUserLogged(userUpdated);
            console.log("User Updated");
        })
        .catch(error => {
            console.log(error);
        });
    }

    return(
        <View>
            <Text variant="displaySmall">{ userState.userLogged?.name ?? "No Name" }</Text>
            <TextInput 
                placeholder="New nick name" 
                mode="outlined"
                label="New Nick"
                value={ newNickName }
                onChange={
                    (event) => EventFunctions.onChangeValueOfInput(event, setNewNickName)
                }
            />

            <Text>Password</Text>
            <TextInput
                placeholder="Password"
                label="Password"
                mode="outlined"
                secureTextEntry={true}
                value={ passwordUser } 
                onChange={
                    (event) => EventFunctions.onChangeValueOfInput(event, setPasswordUser)
                }
            />
            <TextInput 
                placeholder="New password"
                label="New Password"
                mode="outlined"
                secureTextEntry={true}
                value={ newPaswordUser }
                onChange={
                    (event) => EventFunctions.onChangeValueOfInput(event, setNewPasswordUser)
                }
            />

            <Button
                disabled = {!validated}
                onPress={createUserUpdated}
                mode="elevated"
            >
                <Text>Save changes</Text>
            </Button>

            <Text>Other Actions</Text>
            <TextInput
                placeholder="Password for other actions"
                label="Password"
                mode="outlined"
                secureTextEntry={true}
                value={ passwordOtherActions } 
                onChange={
                    (event) => EventFunctions.onChangeValueOfInput(event, setPasswordOtherActions)
                }
            />

            <Button
                disabled = {!validatedOtherActions}
                mode="elevated"
                onPress={() => EventFunctions.onClickDeleteUser(userState, userData)} 
            >
                <Text>Delete User</Text>
            </Button>

            <Button 
                onPress={() => EventFunctions.onClickLogOut(userState)}
            >
                <Text>Log Out</Text>
            </Button>
        </View>
    );
}