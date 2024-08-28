import { View, Pressable } from "react-native";

import { IGeneralContext } from "../../interfaces/contexts/IGeneralContext";
import { GeneralContext } from "../../contexts/GeneralContext";
import { useContext, useState, useEffect } from "react";

import { EventFunctions } from "../../common/EventFunctions";
import { ValidationFunctions } from "../../common/ValidationFunctions";

import { User } from "../../models/User";
import { StackProps } from "../../components/Navigator/Navigator";

import { Text, Button, TextInput, useTheme } from "react-native-paper";

function RegisterPage({ navigation }:StackProps)
{
    const { userData }:IGeneralContext = useContext<IGeneralContext>(GeneralContext);

    const [ userNickInput, setUserNickInput ] = useState<string>("");
    const [ userPasswordInput, setUserPasswordInput ] = useState<string>("");
    const [ userRepeatedPassInput, setUserRepeatedPassInput ] = useState<string>("");

    const [ validated, setValidated ] = useState<boolean>(false);

    const theme = useTheme();

    useEffect(() => {

        setValidated(
            ValidationFunctions.allInputsWithInfo(
                [userNickInput, userPasswordInput, userRepeatedPassInput]
            ) 
            && ValidationFunctions.sameValuesValidation(userPasswordInput, userRepeatedPassInput)
        );

    }, [userNickInput, userPasswordInput, userRepeatedPassInput]);

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
                    mode="outlined"
                    placeholder="Nick Name" 
                    label="Nick"
                    value={ userNickInput }
                    onChange={
                        (event) => EventFunctions.onChangeValueOfInput(
                            event,
                            setUserNickInput
                        )
                    }
                />
                
                <TextInput 
                    style = {{
                        marginBottom: 10,
                        marginHorizontal: "auto",
                        width:"70%"
                    }}
                    mode="outlined"
                    label="Password"
                    placeholder="Password" 
                    secureTextEntry={true}
                    value={ userPasswordInput }
                    onChange={
                        (event) => EventFunctions.onChangeValueOfInput(
                            event,
                            setUserPasswordInput
                        )
                    }
                />
                
                <TextInput 
                    style = {{
                        marginBottom: 10,
                        marginHorizontal: "auto",
                        width:"70%"
                    }}
                    mode="outlined"
                    label="Repeat Password"
                    placeholder="Repeat Password" 
                    secureTextEntry={true}
                    value={ userRepeatedPassInput }
                    onChange={
                        (event) => EventFunctions.onChangeValueOfInput(
                            event,
                            setUserRepeatedPassInput
                        )
                    }
                />

                <Button
                    style={{
                        marginTop:30,
                        marginHorizontal: "auto",
                        width:"70%"
                    }}
                    mode="elevated" 
                    disabled={(!validated)}
                    onPress={
                        ()=>EventFunctions.onClickSignUp(
                            new User(
                                0, 
                                userNickInput, 
                                userPasswordInput, 
                                `${userNickInput}.pwds`
                            ),
                            userData    
                        )
                    }
                >
                    <Text>Sign in</Text>
                </Button>

                
                <Button 
                    onPress={() => navigation.goBack()}
                    style={{
                        marginHorizontal: "auto",
                        width:"70%"
                    }} 
                >
                    <Text>Go Back</Text>
                </Button>
            </View>
        </View>
    );
}

export { RegisterPage };