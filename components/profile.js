import { useState, useEffect } from "react";
import React from "react";
import { db, auth } from "../firebase";
import firebase from "firebase";
import { View, Text } from "react-native";

const Profile = ({ cleaner, navigation }) => {
	console.log(cleaner);

	return (
		<View>
			<Text>Profile Page</Text>
		</View>
	);
};

export default Profile;
