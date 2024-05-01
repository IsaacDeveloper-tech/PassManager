import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

function UserSession()
{
  const [userName, setUserName] = useState("");

  let buttonColor: string = userName.length > 0 ? "#ff5733" : "#2196F3";

  return (
    <View>
      <Text>
        Session found? {userName.length ? "Yes" : "No"}
      </Text>
      { userName.length > 0 ? (
        <Text>
          {userName}
        </Text>
      ) : (
        <Text>
          Anonymous user
        </Text>
      )}
      <View style={styles.buttonContainer}>
        <Button
          color={buttonColor}
          title={userName.length > 0 ? "Close user session" : "Check user session"}
          onPress={() => {
            if (userName.length > 0)
            {
              setUserName("");
            }
            else
            {
              setUserName("Test user")
            }
          }}
        />
      </View>
    </View>
  );
}

function UserSessionPage()
{
  return (
    <View style={styles.container}>
      <UserSession />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8
  },
  buttonContainer: {
    paddingVertical: 4
  }
});

export { UserSessionPage };
