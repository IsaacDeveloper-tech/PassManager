import React, { useState } from 'react';
import { View, TextInput, Pressable, Text } from 'react-native';
import { addPassword } from '../services/passwordService';
import { Password } from '../services/passwordService';

type Props = {
    navigation:any
};

export const AddPasswordScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleAddPassword = () => {
    const newPass: Password = {
        id: Date.now(),
        name: name,
        password: password
    }; 

    addPassword(newPass);
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
            value={password}
            onChangeText={setPassword}
            secureTextEntry
        />
        <Pressable
            onPress={handleAddPassword}
        >
            <Text>Save</Text>
        </Pressable>
    </View>
  );
};