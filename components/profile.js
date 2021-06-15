import { useState, useEffect } from "react";
import React from "react";
import { db, auth } from "../firebase";
import firebase from "firebase";
import { View } from "react-native";
import { Button, Title, Text } from "react-native-paper";

const Profile = ({ cleaner, navigation }) => {
	console.log(cleaner);

	return (
		<View>
			<Title style={{ padding: 10, alignSelf: "center" }}>
				{cleaner.companyName}
			</Title>
			<Text style={{ padding: 10, alignSelf: "center" }}>
				{cleaner.companyDescription}
			</Text>
			<Button
				icon="message-outline"
				mode="contained"
				style={{ padding: 10, justifyContent: "center", margin: 10 }}
			>
				Chat to {cleaner.companyName}
			</Button>
			<Button
				icon="credit-card-outline"
				mode="contained"
				color="green"
				style={{ padding: 10, justifyContent: "center", margin: 10 }}
			>
				Pay {cleaner.companyName}
			</Button>
		</View>
	);
};

export default Profile;
