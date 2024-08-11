import { View, Button, TextInput } from "react-native";

import { GeneralContext } from "../../contexts/GeneralContext";

import { useState, useEffect, useContext } from "react";
import { UserDataManager } from "../../services/userService";
import { ValidationFunctions } from "../../common/ValidationFunctions";
import { EventFunctions } from "../../common/EventFunctions";
import { IGeneralContext } from "../../interfaces/contexts/IGeneralContext";

function LoginPage()
{
    const generalContext:IGeneralContext|null = useContext(GeneralContext);
    const userData:UserDataManager|undefined = generalContext?.userData;

    const [nickNameInput, setNickNameInput] = useState<string>("");
    const [userPasswordInput, setUserPasswordInput] = useState<string>("");
    const [validated, setValidated] = useState<boolean>(false);

    useEffect(() => {
        setValidated(
            ValidationFunctions.allInputsWithInfo([nickNameInput, userPasswordInput])
        );
    }, [nickNameInput, userPasswordInput]);

    return (
        <View>
            <TextInput 
                placeholder="Nick Name" 
                value={ nickNameInput }
                onChange={
                    (event) => EventFunctions.onChangeValueOfInput(event, setNickNameInput)
                }
            />

            <TextInput 
                placeholder="Password"
                value={ userPasswordInput } 
                secureTextEntry = {true}
                onChange={
                    (event) => EventFunctions.onChangeValueOfInput(event, setUserPasswordInput)
                }
            />
            
            <Button
                disabled = {userData === undefined || !validated} 
                title="Sign up" 
                onPress={
                    userData !== undefined ?
                    () => {
                        EventFunctions.onClickLogIn(nickNameInput, userPasswordInput, userData);
                    } 
                    :
                    () => console.log("El gestor de usuarios no está disponible")
                }
            />
        
        </View>
    );
}

export { LoginPage };