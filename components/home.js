import React from "react";
import { Button, Text, View } from "react-native";
import Firebase from "firebase";

const Home = ({ navigation }) => {
  const logOut = () => {
    Firebase.auth()
      .signOut()
      .then(() => {
        console.log("User signed out!");
        navigation.navigate("Landing");
      });
  };
  return (
    <View>
      <Text>You are logged in!</Text>
      <Button title="Log Out" onPress={logOut} />
    </View>
  );
};

export default Home;
