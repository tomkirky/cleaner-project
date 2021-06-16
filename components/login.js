import React from "react";
import { View, Image } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useState } from "react";
import { auth } from "../firebase";
import { StyleSheet } from "react-native";
import FancyButton from "./styling/fancyButton";

const Login = ({ navigation }) => {
	const [loginDetails, setLoginDetails] = useState({
		email: "",
		password: ""
	});

	const onSignUp = () => {
		const { email, password } = loginDetails;
		auth
			.signInWithEmailAndPassword(email, password)
			.then((result) => {
				navigation.navigate("HomeTabs");
			})
			.catch((error) => {
				if (error.code === "auth/invalid-email") {
					console.log("That email address is invalid!");
				}
				console.log(error);
			});
	};

	return (
		<View style={styles.container}>
			<Image
				style={styles.logo}
				source={require("../img/clean_1_-removebg-preview.png")}
			/>
			<View>
				<TextInput
					style={styles.textInput}
					label="Email"
					onChangeText={(event) =>
						setLoginDetails((currLoginDetails) => {
							return { ...currLoginDetails, email: event };
						})
					}
				/>
				<TextInput
					style={styles.textInput}
					label="Password"
					secureTextEntry={true}
					onChangeText={(event) =>
						setLoginDetails((currLoginDetails) => {
							return { ...currLoginDetails, password: event };
						})
					}
				/>
			</View>
			<View>
				<FancyButton onPress={() => onSignUp()} title="Sign in">
					Sign in
				</FancyButton>

				<Button
					style={styles.button}
					mode="text"
					color="black"
					onPress={() => navigation.navigate("UserType")}
					title="Not Registered?"
				>
					Not registered?
				</Button>
			</View>
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
	logo: {
		width: 250,
		height: 70,
		alignSelf: "center",
		marginBottom: 30
	},
	button: {
		marginLeft: 10,
		marginRight: 10,
		marginTop: 15
	},
	textInput: {
		marginBottom: 10
	}
});

export default Login;
