import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { PasswordList } from '../components/PasswordList';
import { Password, getPasswords } from '../services/passwordService';

type Props = {
    navigation:any
};

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const passwords = getPasswords();

  return (
    <View>
        <PasswordList
            passwords={passwords}
            onPressItem={(password:Password) => navigation.navigate('ViewPassword', { password })}
        />
        <Pressable
            onPress={() => navigation.navigate('AddPassword')}
        >
            <Text>Add Password</Text>
        </Pressable>
    </View>
  );
};