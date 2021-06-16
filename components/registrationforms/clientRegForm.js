import React from "react";
import { View, Button, StyleSheet, ScrollView } from "react-native";
import { TextInput, Title } from "react-native-paper";
import FancyButton from "../styling/fancyButton";

export const ClientSignupForm = ({ setClientRegisterDetails, onRegister }) => {
	return (
		<View style={styles.container}>
			<Title style={{ paddingBottom: 20, alignSelf: "center" }}>
				Please enter your details below
			</Title>
			<ScrollView>
				<TextInput
					style={styles.textInput}
					label="Name"
					onChangeText={(event) =>
						setClientRegisterDetails((currRegisterDetails) => {
							return { ...currRegisterDetails, name: event };
						})
					}
				/>
				<TextInput
					style={styles.textInput}
					label="Postcode"
					onChangeText={(event) =>
						setClientRegisterDetails((currRegisterDetails) => {
							return { ...currRegisterDetails, postcode: event };
						})
					}
				/>
				<TextInput
					style={styles.textInput}
					label="Email"
					onChangeText={(event) =>
						setClientRegisterDetails((currRegisterDetails) => {
							return { ...currRegisterDetails, email: event };
						})
					}
				/>
				<TextInput
					style={styles.textInput}
					label="Password"
					secureTextEntry={true}
					onChangeText={(event) =>
						setClientRegisterDetails((currRegisterDetails) => {
							return { ...currRegisterDetails, password: event };
						})
					}
				/>
				<TextInput
					style={styles.textInput}
					label="AvatarURL"
					onChangeText={(event) =>
						setClientRegisterDetails((currRegisterDetails) => {
							return { ...currRegisterDetails, photoURL: event };
						})
					}
				/>
				<FancyButton onPress={() => onRegister()} title="Sign Up">
					Sign Up
				</FancyButton>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		flex: 1,
		padding: 20
		// backgroundColor: "#ffffff"
	},
	button: {
		marginLeft: 10,
		marginRight: 10,
		marginTop: 15
	},
	textInput: {
		marginBottom: 5
	}
});
