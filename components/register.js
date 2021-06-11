import React, { Component } from "react";
import { useState } from "react";
import { ClientSignupForm } from "./registrationforms/clientRegForm";
import firebase from "firebase";
import { useEffect } from "react";
// import { db } from "../App";

const Register = ({ navigation, userType }) => {
	const [clientRegisterDetails, setClientRegisterDetails] = useState({
		name: "",
		city: "",
		username: "",
		email: "",
		password: "",
	});

	const [cleanerRegisterDetails, setCleanerRegisterDetails] = useState({
		companyName: "",
		companyCity: "",
		companyPhoneNumber: "",
		companyEmail: "",
		companyPassword: "",
		companyDescription: "",
	});

	const onRegister = () => {
		const { name, city, username, email, password } = clientRegisterDetails;
		const {
			companyName,
			companyCity,
			companyPhoneNumber,
			companyEmail,
			companyPassword,
			companyDescription,
		} = cleanerRegisterDetails;

		if (userType === "client") {
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
							username,
							email,
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
		} else {
			firebase
				.auth()
				.createUserWithEmailAndPassword(companyEmail, companyPassword)
				.then((result) => {
					firebase
						.firestore()
						.collection("cleaners")
						.doc(firebase.auth().currentUser.uid)
						.set({
							companyName,
							companyCity,
							companyPhoneNumber,
							companyEmail,
							companyDescription,
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
		}
	};

	///////////////////////////////////// vvv THIS NEEDS TO GO INTO OTHER SCREEN - CLEANER LIST???
	// var usersRef = firebase.firestore().collection("users");
	// var query = usersRef.where("city", "==", "Manchester");
	// useEffect(() => {
	// 	firebase
	// 		.firestore()
	// 		.collection("users")
	// 		.where("city", "==", "Manchester")
	// 		.get()
	// 		.then((querySnapshot) => {
	// 			querySnapshot.forEach((doc) => {
	// 				// doc.data() is never undefined for query doc snapshots
	// 				console.log(doc.id, " => ", doc.data());
	// 			});
	// 		});
	// }, []);
	/////////////////////////////////////

	if (userType === "client") {
		return (
			<ClientSignupForm
				setClientRegisterDetails={setClientRegisterDetails}
				onRegister={onRegister}
			/>
		);
	} else {
		return (
			<ClientSignupForm
				setClientRegisterDetails={setClientRegisterDetails}
				onRegister={onRegister}
			/>
		);
	}
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
