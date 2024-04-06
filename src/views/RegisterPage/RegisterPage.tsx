import { View, Button, TextInput } from "react-native";

function RegisterPage()
{
    return (
        <View>
            <TextInput placeholder="Nick Name"></TextInput>
            <TextInput placeholder="Password"></TextInput>
            <TextInput placeholder="Repeat Password"></TextInput>
            <Button 
                title="Sign up" 
                onPress={() => console.log("función de registro de usuario")}
            />
        </View>
    );
}

export { RegisterPage };