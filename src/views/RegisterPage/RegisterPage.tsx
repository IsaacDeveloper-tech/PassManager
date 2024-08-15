import { View, Button, TextInput, Pressable, Text } from "react-native";

import { IGeneralContext } from "../../interfaces/contexts/IGeneralContext";
import { GeneralContext } from "../../contexts/GeneralContext";
import { useContext, useState, useEffect } from "react";

import { EventFunctions } from "../../common/EventFunctions";
import { ValidationFunctions } from "../../common/ValidationFunctions";

import { User } from "../../models/User";
import { StackProps } from "../../components/Navigator/Navigator";

function RegisterPage({ navigation }:StackProps)
{
    const { userData }:IGeneralContext = useContext<IGeneralContext>(GeneralContext);

    const [ userNickInput, setUserNickInput ] = useState<string>("");
    const [ userPasswordInput, setUserPasswordInput ] = useState<string>("");
    const [ userRepeatedPassInput, setUserRepeatedPassInput ] = useState<string>("");

    const [ validated, setValidated ] = useState<boolean>(false);

    useEffect(() => {

        setValidated(
            ValidationFunctions.allInputsWithInfo(
                [userNickInput, userPasswordInput, userRepeatedPassInput]
            ) 
            && ValidationFunctions.sameValuesValidation(userPasswordInput, userRepeatedPassInput)
        );

    }, [userNickInput, userPasswordInput, userRepeatedPassInput]);

    return (
        <View>
            <TextInput 
                placeholder="Nick Name" 
                value={ userNickInput }
                onChange={
                    (event) => EventFunctions.onChangeValueOfInput(
                        event,
                        setUserNickInput
                    )
                }
            />
            
            <TextInput 
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

            <Button disabled={(!validated)}
                title="Sign up" 
                
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
            />

            <Pressable onTouchEnd={() => navigation.goBack()}>
                <Text>Go Back</Text>
            </Pressable>
        </View>
    );
}

export { RegisterPage };