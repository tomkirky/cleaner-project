import React, { Component } from "react";
import { View, Button } from "react-native";
import { TextInput } from "react-native-paper";
import { useState } from "react";
import { auth } from "../firebase";
import firebase from "firebase";
import { StyleSheet } from "react-native";

const Login = ({ navigation }) => {
	const [loginDetails, setLoginDetails] = useState({
		email: "",
		password: "",
	});

	const onSignUp = () => {
		const { email, password } = loginDetails;
		// console.log(loginDetails);
		auth
			.signInWithEmailAndPassword(email, password)
			.then((result) => {
				// console.log(result);

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
		<View>
			<View>
				<TextInput
					label="Email"
					onChangeText={(event) =>
						setLoginDetails((currLoginDetails) => {
							return { ...currLoginDetails, email: event };
						})
					}
				/>
				<TextInput
					label="Password"
					secureTextEntry={true}
					onChangeText={(event) =>
						setLoginDetails((currLoginDetails) => {
							return { ...currLoginDetails, password: event };
						})
					}
				/>

				<Button onPress={() => onSignUp()} title="Sign in" />
			</View>
			<View>
				<Button
					onPress={() => navigation.navigate("UserType")}
					title="Not Registered?"
				/>
			</View>
		</View>
	);
};

// export class Login extends Component {
// 	constructor(props) {
// 		super(props);

// 		this.state = {
// 			email: "",
// 			password: "",
// 		};

// 		this.onSignUp = this.onSignUp.bind(this);
// 	}

// 	onSignUp() {
// 		const { email, password } = this.state;
// 		firebase
// 			.auth()
// 			.signInWithEmailAndPassword(email, password)
// 			.then((result) => {
// 				console.log(result);
// 			})
// 			.catch((error) => {
// 				console.log(error);
// 			});
// 	}

// 	render() {
// 		return (
// 			<View>
// 				<TextInput
// 					placeholder="email"
// 					onChangeText={(email) => this.setState({ email })}
// 				/>
// 				<TextInput
// 					placeholder="password"
// 					secureTextEntry={true}
// 					onChangeText={(password) => this.setState({ password })}
// 				/>

// 				<Button onPress={() => this.onSignUp()} title="Sign in" />
// 			</View>
// 		);
// 	}
// }

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		marginTop: 50,
		padding: 20,
		backgroundColor: "#ffffff",
	},
});

export default Login;
