import React from "react";
import { View, Button, TextInput } from "react-native";

export const ClientSignupForm = ({ setClientRegisterDetails }) => {
	return (
		<View>
			<TextInput
				placeholder="name"
				onChangeText={(event) =>
					setClientRegisterDetails((currRegisterDetails) => {
						return { ...currRegisterDetails, name: event };
					})
				}
			/>
			<TextInput
				placeholder="city"
				onChangeText={(event) =>
					setClientRegisterDetails((currRegisterDetails) => {
						return { ...currRegisterDetails, city: event };
					})
				}
			/>
			<TextInput
				placeholder="email"
				onChangeText={(event) =>
					setClientRegisterDetails((currRegisterDetails) => {
						return { ...currRegisterDetails, email: event };
					})
				}
			/>
			<TextInput
				placeholder="password"
				secureTextEntry={true}
				onChangeText={(event) =>
					setClientRegisterDetails((currRegisterDetails) => {
						return { ...currRegisterDetails, password: event };
					})
				}
			/>

			<Button onPress={() => onRegister()} title="Sign Up" />
		</View>
	);
};
