import { View, Button, TextInput, Pressable } from "react-native";

import { UserDataManager } from "../../services/userService";
import { IGeneralContext } from "../../interfaces/contexts/IGeneralContext";
import { GeneralContext } from "../../contexts/GeneralContext";
import { useContext, useState, useEffect } from "react";

import { EventFunctions } from "../../common/EventFunctions";
import { ValidationFunctions } from "../../common/ValidationFunctions";

import { User } from "../../models/User";

function RegisterPage()
{
    const generalContext:IGeneralContext|null = useContext<IGeneralContext|null>(GeneralContext);
    const userData:UserDataManager|undefined = generalContext?.userData;

    const [ userNickInput, setUserNickInput ] = useState<string>("");
    const [ userPasswordInput, setUserPasswordInput ] = useState<string>("");
    const [ userRepeatedPassInput, setUserRepeatedPassInput ] = useState<string>("");

    const [ validated, setValidated ] = useState<boolean>(false);

    useEffect(() => {

        setValidated(
            ValidationFunctions.allInputsWithInfo(
                [userNickInput, userPasswordInput, userRepeatedPassInput]
            ) 
            && ValidationFunctions.repeatPasswordValidation(userPasswordInput, userRepeatedPassInput)
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

            <Button disabled={(userData === undefined || !validated)}
                title="Sign up" 
                
                onPress={
                    userData !== undefined ?
                    () => EventFunctions.onClickSignUp(
                        new User(
                            0, 
                            userNickInput, 
                            userPasswordInput, 
                            `${userNickInput}.pwds`
                        ),
                        userData
                    )
                    :
                    () => console.log("userData not defined")
                }
            />
        </View>
    );
}

export { RegisterPage };