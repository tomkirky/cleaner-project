import React, { Component } from "react";
import { View, Button, TextInput } from "react-native";
import { useState } from "react";

import firebase from "firebase";
import { useEffect } from "react";
// import { db } from "../App";

const Register = ({ navigation }) => {
	const [registerDetails, setRegisterDetails] = useState({
		name: "",
		city: "",
		email: "",
		password: ""
	});

	const onRegister = () => {
		const { name, city, email, password } = registerDetails;
		console.log(registerDetails);
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((result) => {
				firebase
					.firestore()
					.collection("users")
					.doc(firebase.auth().currentUser.uid)
					.set({
						name,
						city,
						email
					});
				// console.log(result);
				navigation.navigate("Home");
			})
			.catch((error) => {
				if (error.code === "auth/invalid-email") {
					console.log("That email address is invalid!");
				}
				console.log(error); // NEED TO DISPLAY ERROR.MESSAGE
			});
	};

	///////////////////////////////////// vvv THIS NEEDS TO GO INTO OTHER SCREEN - CLEANER LIST???
	// var usersRef = firebase.firestore().collection("users");
	// var query = usersRef.where("city", "==", "Manchester");
	useEffect(() => {
		firebase
			.firestore()
			.collection("users")
			.where("city", "==", "Manchester")
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					// doc.data() is never undefined for query doc snapshots
					console.log(doc.id, " => ", doc.data());
				});
			});
	}, []);
	/////////////////////////////////////

	return (
		<View>
			<TextInput
				placeholder="name"
				onChangeText={(event) =>
					setRegisterDetails((currRegisterDetails) => {
						return { ...currRegisterDetails, name: event };
					})
				}
			/>
			<TextInput
				placeholder="city"
				onChangeText={(event) =>
					setRegisterDetails((currRegisterDetails) => {
						return { ...currRegisterDetails, city: event };
					})
				}
			/>
			<TextInput
				placeholder="email"
				onChangeText={(event) =>
					setRegisterDetails((currRegisterDetails) => {
						return { ...currRegisterDetails, email: event };
					})
				}
			/>
			<TextInput
				placeholder="password"
				secureTextEntry={true}
				onChangeText={(event) =>
					setRegisterDetails((currRegisterDetails) => {
						return { ...currRegisterDetails, password: event };
					})
				}
			/>

			<Button onPress={() => onRegister()} title="Sign Up" />
		</View>
	);
};

// export class Register extends Component {
// 	constructor(props) {
// 		super(props);

// 		this.state = {
// 			email: "",
// 			password: "",
// 			name: "",
// 		};

// 		this.onSignUp = this.onSignUp.bind(this);
// 	}

//     onSignUp() {
//         const { email, password, name} = this.state;
// 		firebase.auth().createUserWithEmailAndPassword(email, password)
// 		.then((result) => {
// 			console.log(result)
// 		})
// 		.catch((error) => {
// 			console.log(error)
// 		})
//     }

// 	render() {
// 		return (
// 			<View>
// 				<TextInput
// 					placeholder="name"
// 					onChangeText={(name) => this.setState({ name })}
// 				/>
// 				<TextInput
// 					placeholder="email"
// 					onChangeText={(email) => this.setState({ email })}
// 				/>
// 				<TextInput
// 					placeholder="password"
// 					secureTextEntry={true}
// 					onChangeText={(password) => this.setState({ password })}
// 				/>

// 				<Button onPress={() => this.onSignUp()} title="Sign Up" />
// 			</View>
// 		);
// 	}
// }

export default Register;
