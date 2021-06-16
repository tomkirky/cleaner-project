import React from "react";
import { View, Button } from "react-native";
import { TextInput } from "react-native-paper";

export const ClientSignupForm = ({ setClientRegisterDetails, onRegister }) => {
	return (
		<View>
			<TextInput
				label="Name"
				onChangeText={(event) =>
					setClientRegisterDetails((currRegisterDetails) => {
						return { ...currRegisterDetails, name: event };
					})
				}
			/>
			<TextInput
				label="Postcode"
				onChangeText={(event) =>
					setClientRegisterDetails((currRegisterDetails) => {
						return { ...currRegisterDetails, postcode: event };
					})
				}
			/>
			<TextInput
				label="Username"
				onChangeText={(event) =>
					setClientRegisterDetails((currRegisterDetails) => {
						return { ...currRegisterDetails, username: event };
					})
				}
			/>
			<TextInput
				label="Email"
				onChangeText={(event) =>
					setClientRegisterDetails((currRegisterDetails) => {
						return { ...currRegisterDetails, email: event };
					})
				}
			/>
			<TextInput
				label="Password"
				secureTextEntry={true}
				onChangeText={(event) =>
					setClientRegisterDetails((currRegisterDetails) => {
						return { ...currRegisterDetails, password: event };
					})
				}
			/>
			<TextInput
				label="AvatarURL"
				onChangeText={(event) =>
					setClientRegisterDetails((currRegisterDetails) => {
						return { ...currRegisterDetails, photoURL: event };
					})
				}
			/>

			<Button onPress={() => onRegister()} title="Sign Up" />
		</View>
	);
};
