import React from "react";
import { View, Button } from "react-native";
import { TextInput } from "react-native-paper";

export const CleanerSignupForm = ({
  setCleanerRegisterDetails,
  onRegister,
}) => {
  return (
    <View>
      <TextInput
        label="Name"
        onChangeText={(event) =>
          setCleanerRegisterDetails((currRegisterDetails) => {
            return { ...currRegisterDetails, companyName: event };
          })
        }
      />
      <TextInput
        label="Postcode"
        onChangeText={(event) =>
          setCleanerRegisterDetails((currRegisterDetails) => {
            return { ...currRegisterDetails, companyPostcode: event };
          })
        }
      />

      <TextInput
        label="Email"
        onChangeText={(event) =>
          setCleanerRegisterDetails((currRegisterDetails) => {
            return { ...currRegisterDetails, companyEmail: event };
          })
        }
      />
      <TextInput
        label="Password"
        secureTextEntry={true}
        onChangeText={(event) =>
          setCleanerRegisterDetails((currRegisterDetails) => {
            return { ...currRegisterDetails, companyPassword: event };
          })
        }
      />
      <TextInput
        label="Briefly describe your company..."
        onChangeText={(event) =>
          setCleanerRegisterDetails((currRegisterDetails) => {
            return { ...currRegisterDetails, companyDescription: event };
          })
        }
      />
      <TextInput
        label="AvatarURL"
        onChangeText={(event) =>
          setCleanerRegisterDetails((currRegisterDetails) => {
            return { ...currRegisterDetails, cleanerPhotoURL: event };
          })
        }
      />

      <Button onPress={() => onRegister()} title="Sign Up" />
    </View>
  );
};
