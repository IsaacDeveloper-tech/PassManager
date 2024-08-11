import { View, Button, TextInput, Text, Pressable } from "react-native";

import { GeneralContext } from "../../contexts/GeneralContext";

import { useState, useEffect, useContext } from "react";
import { ValidationFunctions } from "../../common/ValidationFunctions";
import { EventFunctions } from "../../common/EventFunctions";
import { IGeneralContext, UserState } from "../../interfaces/contexts/IGeneralContext";
import { StackProps } from "../../components/Navigator/Navigator";

function LoginPage({ navigation }:StackProps)
{
    const { userData }:IGeneralContext = useContext<IGeneralContext>(GeneralContext);

    const [nickNameInput, setNickNameInput] = useState<string>("");
    const [userPasswordInput, setUserPasswordInput] = useState<string>("");
    const [validated, setValidated] = useState<boolean>(false);

    const { setUserIsLogged, setUserLogged }:UserState = useContext(GeneralContext).userState;

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
                disabled = {!validated} 
                title="Sign up" 
                onPress={
                    () => {
                        EventFunctions.onClickLogIn(
                            nickNameInput, 
                            userPasswordInput, 
                            userData,
                            setUserLogged,
                            setUserIsLogged
                        );
                    }
                }
            />

            <Pressable onTouchEnd={() => navigation.navigate("RegisterPage")}>
                <Text>Go to Register page</Text>
            </Pressable>
        
        </View>
    );
}

export { LoginPage };