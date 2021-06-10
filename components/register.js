import React, { Component } from "react";
import { View, Button, TextInput } from "react-native";
import {useState} from "react";

import firebase from "firebase"


const Register = () => {
	const [registerDetails, setRegisterDetails] = useState( {
		name: "",
		email: "",
		password: ""
	})

	const onRegister = () => {
		const { email, password } = registerDetails;
		console.log(registerDetails)
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((result) => {
				console.log(result);
			})
			.catch((error) => {
				if (error.code === "auth/invalid-email") {
					console.log("That email address is invalid!");
				  }
				console.log(error);
			});
	}

	return (
	<View>
		<TextInput
			placeholder="name"
			onChangeText={(event) => setRegisterDetails((currRegisterDetails) => {
				return {...currRegisterDetails, name: event};
			})}
		/>
		<TextInput
			placeholder="email"
			onChangeText={(event) => setRegisterDetails((currRegisterDetails) => {
				return {...currRegisterDetails, email: event};
			})}
		/>
		<TextInput
			placeholder="password"
			secureTextEntry={true}
			onChangeText={(event) => setRegisterDetails((currRegisterDetails) => {
				return {...currRegisterDetails, password: event};
			})}
		/>

		<Button onPress={() => onRegister()} title="Sign Up" />
	</View>
);
}


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
