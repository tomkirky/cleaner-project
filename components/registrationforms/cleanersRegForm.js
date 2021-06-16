import React from "react";
import { View, Button, StyleSheet, ScrollView } from "react-native";
import { TextInput, Title } from "react-native-paper";
import FancyButton from "../styling/fancyButton";

export const CleanerSignupForm = ({
	setCleanerRegisterDetails,
	onRegister
}) => {
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
						setCleanerRegisterDetails((currRegisterDetails) => {
							return { ...currRegisterDetails, companyName: event };
						})
					}
				/>
				<TextInput
					style={styles.textInput}
					label="Postcode"
					onChangeText={(event) =>
						setCleanerRegisterDetails((currRegisterDetails) => {
							return { ...currRegisterDetails, companyPostcode: event };
						})
					}
				/>

				<TextInput
					style={styles.textInput}
					label="City"
					onChangeText={(event) =>
						setCleanerRegisterDetails((currRegisterDetails) => {
							return { ...currRegisterDetails, companyCity: event };
						})
					}
				/>

				<TextInput
					style={styles.textInput}
					label="Email"
					onChangeText={(event) =>
						setCleanerRegisterDetails((currRegisterDetails) => {
							return { ...currRegisterDetails, companyEmail: event };
						})
					}
				/>
				<TextInput
					style={styles.textInput}
					label="Password"
					secureTextEntry={true}
					onChangeText={(event) =>
						setCleanerRegisterDetails((currRegisterDetails) => {
							return { ...currRegisterDetails, companyPassword: event };
						})
					}
				/>
				<TextInput
					style={styles.textInput}
					label="Briefly describe your company..."
					onChangeText={(event) =>
						setCleanerRegisterDetails((currRegisterDetails) => {
							return { ...currRegisterDetails, companyDescription: event };
						})
					}
				/>
				<TextInput
					style={styles.textInput}
					label="AvatarURL"
					onChangeText={(event) =>
						setCleanerRegisterDetails((currRegisterDetails) => {
							return { ...currRegisterDetails, cleanerPhotoURL: event };
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
