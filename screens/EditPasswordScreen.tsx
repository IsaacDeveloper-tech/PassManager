import React, { useState } from 'react';
import { View, TextInput, Pressable, Text } from 'react-native';
import { updatePassword } from '../services/passwordService';

type Props = {
    route: any,
    navigation: any
};

export const EditPasswordScreen: React.FC<Props> = ({ route, navigation }) => {
  const { password } = route.params;
  const [name, setName] = useState(password.name);
  const [passwordValue, setPasswordValue] = useState(password.password);

  const handleUpdatePassword = () => {
    updatePassword(password.id, { ...password, name, password: passwordValue });
    navigation.goBack();
  };

  return (
    <View>
        <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
        />
        <TextInput
            placeholder="Password"
            value={passwordValue}
            onChangeText={setPasswordValue}
            secureTextEntry
        />
        <Pressable
            onPress={handleUpdatePassword}
        >
            <Text>Save</Text>
        </Pressable>
    </View>
  );
};