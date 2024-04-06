import { View, Button, TextInput } from "react-native";

function LoginPage()
{
    return (
        <View>
            <TextInput placeholder="Nick Name"></TextInput>
            <TextInput placeholder="Password"></TextInput>
            <Button 
                title="Sign up" 
                onPress={() => console.log("función de login de usuario")}
            />
        </View>
    );
}

export { LoginPage };