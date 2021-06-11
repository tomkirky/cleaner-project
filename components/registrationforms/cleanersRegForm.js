import React from "react";
import { View, Button, TextInput } from "react-native";

export const CleanerSignupForm = ({
	setCleanerRegisterDetails,
	onRegister,
}) => {
	return (
		<View>
			<TextInput
				placeholder="Name"
				onChangeText={(event) =>
					setCleanerRegisterDetails((currRegisterDetails) => {
						return { ...currRegisterDetails, companyName: event };
					})
				}
			/>
			<TextInput
				placeholder="City"
				onChangeText={(event) =>
					setCleanerRegisterDetails((currRegisterDetails) => {
						return { ...currRegisterDetails, companyCity: event };
					})
				}
			/>
			<TextInput
				placeholder="Username"
				onChangeText={(event) =>
					setCleanerRegisterDetails((currRegisterDetails) => {
						return { ...currRegisterDetails, companyPhoneNumber: event };
					})
				}
			/>
			<TextInput
				placeholder="Email"
				onChangeText={(event) =>
					setCleanerRegisterDetails((currRegisterDetails) => {
						return { ...currRegisterDetails, companyEmail: event };
					})
				}
			/>
			<TextInput
				placeholder="Password"
				secureTextEntry={true}
				onChangeText={(event) =>
					setCleanerRegisterDetails((currRegisterDetails) => {
						return { ...currRegisterDetails, companyPassword: event };
					})
				}
			/>
			<TextInput
				placeholder="Briefly describe your company..."
				secureTextEntry={true}
				onChangeText={(event) =>
					setCleanerRegisterDetails((currRegisterDetails) => {
						return { ...currRegisterDetails, companyDescription: event };
					})
				}
			/>

			<Button onPress={() => onRegister()} title="Sign Up" />
		</View>
	);
};
