import { db, auth } from "../firebase";
import firebase from "firebase";
import { Card } from "react-native-elements";
import React from "react";
import { View, Pressable, ScrollView } from "react-native";
import { Button, Title, Text, Avatar } from "react-native-paper";
import { useState, useEffect } from "react";
import StarRating from "react-native-star-rating";

const Cleans = () => {
	const [cleanerDetails, setCleanerDetails] = useState();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		db.collection("cleaners")
			.doc(auth.currentUser.uid)
			.get()
			.then((doc) => {
				setCleanerDetails(doc.data());
				setIsLoading(false);
			});
	}, []);

	console.log(cleanerDetails);
	if (isLoading) {
		return (
			<View style={{ marginTop: 50 }}>
				<Text>Loading</Text>
			</View>
		);
	} else {
		return (
			<View
				style={{
					justifyContent: "center",
					flex: 1,
					padding: 20,
					marginTop: 50,
				}}
			>
				<Avatar.Image
					size={150}
					source={{
						uri: cleanerDetails.cleanerPhotoURL,
					}}
					style={{ margin: 25, alignSelf: "center" }}
				/>
				<Title style={{ padding: 10, alignSelf: "center" }}>
					Hello {cleanerDetails.companyName}
				</Title>
				<Title style={{ padding: 10, alignSelf: "center" }}>
					Current Cleans
				</Title>
				<Text style={{ padding: 10, alignSelf: "center" }}>
					You currently have {cleanerDetails.numberOfJobs || 0} clients
				</Text>
				<Text style={{ padding: 10, alignSelf: "center" }}>
					You have been paid £{cleanerDetails.balance}
				</Text>
				<Text style={{ padding: 10, marginBottom: 25, alignSelf: "center" }}>
					Location: {cleanerDetails.companyCity}
				</Text>
				<StarRating
					disabled={true}
					maxStars={5}
					rating={cleanerDetails.rating}
					fullStarColor={"gold"}
					starStyle={{ paddingLeft: 15, paddingRight: 15, alignSelf: "center" }}
				/>
			</View>
		);
	}
};

export default Cleans;
