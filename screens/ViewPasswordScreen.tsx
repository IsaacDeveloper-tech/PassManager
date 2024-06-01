import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { deletePassword } from '../services/passwordService';

type Props = {
    route:any,
    navigation:any
};

export const ViewPasswordScreen: React.FC<Props> = ({ route, navigation }) => {
    const { password } = route.params;

    const handleDelete = () => {
        deletePassword(password.id);
        navigation.goBack();
    };

    return (
      <View>
          <Text>Name: {password.name}</Text>
          <Text>Password: {password.password}</Text>
          <Pressable
            onPress={() => navigation.navigate('EditPassword', { password })}
          >
            <Text>Edit</Text>
          </Pressable>
          <Pressable
            onPress={handleDelete}
          >
            <Text>Delete</Text>
          </Pressable>
      </View>
    );
};