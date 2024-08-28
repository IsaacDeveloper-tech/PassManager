import { View } from "react-native";

import { GeneralContext } from "../../contexts/GeneralContext";

import { useState, useEffect, useContext } from "react";
import { ValidationFunctions } from "../../common/ValidationFunctions";
import { EventFunctions } from "../../common/EventFunctions";
import { IGeneralContext, UserState } from "../../interfaces/contexts/IGeneralContext";
import { StackProps } from "../../components/Navigator/Navigator";

import { TextInput, Button, Text, useTheme } from "react-native-paper";

function LoginPage({ navigation, route }:StackProps)
{
    const { userData }:IGeneralContext = useContext<IGeneralContext>(GeneralContext);
    const theme = useTheme();

    const [nickNameInput, setNickNameInput] = useState<string>(route.params?.name ?? "");
    const [userPasswordInput, setUserPasswordInput] = useState<string>("");
    const [validated, setValidated] = useState<boolean>(false);

    const { setUserIsLogged, setUserLogged }:UserState = useContext(GeneralContext).userState;

    useEffect(() => {
        setValidated(
            ValidationFunctions.allInputsWithInfo([nickNameInput, userPasswordInput])
        );
    }, [nickNameInput, userPasswordInput]);

    return (
        <View style={{
            backgroundColor: theme.colors.background,
            width:"100%",
            height:"100%"
        }}>
            <View
                style={{
                    backgroundColor: theme.colors.primaryContainer,
                    marginTop: 200,
                    marginBottom: 10,
                    marginHorizontal: "auto",
                    width:"90%",
                    elevation: 4,
                    borderRadius: 10
                }}
            >
                <TextInput 
                    style = {{
                        marginTop: 50,
                        marginBottom: 10,
                        marginHorizontal: "auto",
                        width:"70%"
                    }}
                    placeholder="Nick Name" 
                    value={ nickNameInput }
                    disabled = {true}
                    mode="outlined"
                    label="Nick"
                    onChange={
                        (event) => EventFunctions.onChangeValueOfInput(event, setNickNameInput)
                    }
                />

                <TextInput
                    style = {{
                        marginBottom: 10,
                        marginHorizontal: "auto",
                        width:"70%"
                    }} 
                    placeholder="Password"
                    value={ userPasswordInput } 
                    secureTextEntry = {true}
                    mode="outlined"
                    label="Password"
                    onChange={
                        (event) => EventFunctions.onChangeValueOfInput(event, setUserPasswordInput)
                    }
                />
                
                <Button
                    style={{
                        marginTop:80,
                        marginHorizontal: "auto",
                        width:"70%"
                    }}
                    disabled = {!validated}
                    onPress={
                        () => {
                            EventFunctions.onClickLogIn(
                                route.params?.id ?? 0, 
                                userPasswordInput, 
                                userData,
                                setUserLogged,
                                setUserIsLogged
                            );
                        }
                    }
                    mode="elevated"
                >
                    <Text>Login</Text>
                </Button>

                <Button
                    style={{
                        marginHorizontal: "auto",
                        width:"70%"
                    }} 
                    onPress={() => navigation.goBack()}
                >
                    <Text>Go back</Text>
                </Button>
            </View>
        
        </View>
    );
}

export { LoginPage };