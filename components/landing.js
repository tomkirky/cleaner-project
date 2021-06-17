import React from "react";
import { Text, View, Button } from "react-native";
import { auth } from "../firebase";

export default function Landing({ navigation }) {
	const logOut = () => {
		auth.signOut().then(() => {
			console.log("User signed out!");
			navigation.navigate("Login");
		});
	};

	return (
		<View style={{ flex: 1, justifyContent: "center", marginTop: 50 }}>
			{/* <Button
				title="Register"
				onPress={() => navigation.navigate("Register")}
			/>
			<Button title="Login" onPress={() => navigation.navigate("Login")} /> */}
			<Button
				title="Payments"
				onPress={() => navigation.navigate("Payments")}
			/>
			<Button title="Map" onPress={() => navigation.navigate("Map")} />
			<Button
				title="PaymentAmount"
				onPress={() => navigation.navigate("PaymentAmount")}
			/>
			<Button
				title="CleanersList"
				onPress={() => navigation.navigate("CleanersList")}
			/>
			<Button title="Chat" onPress={() => navigation.navigate("ChatScreen")} />
			<View>
				<Button title="Log Out" onPress={logOut} />
			</View>
		</View>
	);
}
