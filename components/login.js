import React, { Component } from "react";
import { View, Button, TextInput } from "react-native";
import { useState } from "react";

import firebase from "firebase";

const Login = ({ navigation }) => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const onSignUp = () => {
    const { email, password } = loginDetails;
    console.log(loginDetails);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);

        navigation.navigate("Home");
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
      <TextInput
        placeholder="email"
        onChangeText={(event) =>
          setLoginDetails((currLoginDetails) => {
            return { ...currLoginDetails, email: event };
          })
        }
      />
      <TextInput
        placeholder="password"
        secureTextEntry={true}
        onChangeText={(event) =>
          setLoginDetails((currLoginDetails) => {
            return { ...currLoginDetails, password: event };
          })
        }
      />

      <Button onPress={() => onSignUp()} title="Sign in" />
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

export default Login;
