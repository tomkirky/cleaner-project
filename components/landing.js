import React from "react";
import { Text, View, Button } from "react-native";
import { auth } from "../firebase";

export default function Landing({ navigation }) {
	return (
		<View style={{ flex: 1, justifyContent: "center" }}>
			<Button
				title="Register"
				onPress={() => navigation.navigate("Register")}
			/>
			<Button title="Login" onPress={() => navigation.navigate("Login")} />
			<Button
				title="Payments"
				onPress={() => navigation.navigate("Payments")}
			/>
			<Button title="Map" onPress={() => navigation.navigate("Map")} />
			<Button
				title="Payment Amount"
				onPress={() => navigation.navigate("PaymentAmount")}
			/>
			<Button
				title="CleanersList"
				onPress={() => navigation.navigate("CleanersList")}
			/>
			<Button title="Chat" onPress={() => navigation.navigate("ChatScreen")} />
		</View>
	);
}
