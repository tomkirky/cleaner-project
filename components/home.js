import React from "react";
import { Button, Text, View } from "react-native";
import Firebase from "firebase";
import { db } from "../firebase.js";

//Retaining file however this is not used within final production

const Home = ({ navigation }) => {
	const logOut = () => {
		Firebase.auth()
			.signOut()
			.then(() => {
				console.log("User signed out!");
				navigation.navigate("Login");
			});
	};

	let collRef = db.collection("cleaners").doc("4Hn5dWgGf5cNuDghR6dkmwQiiaW2");
	collRef.get().then(() => {
		// console.log(doc.data());
	});

	return (
		<View style={{ marginTop: 50 }}>
			<Text>Welcome!</Text>
			<Button title="Log Out" onPress={logOut} />
		</View>
	);
};

export default Home;
