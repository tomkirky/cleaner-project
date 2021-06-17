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
			<View>
				<Text>Loading</Text>
			</View>
		);
	} else {
		return (
			<View>
				<Avatar.Image
					size={150}
					source={{
						uri: cleanerDetails.cleanerPhotoURL,
					}}
					style={{ margin: 5, alignSelf: "center" }}
				/>
				<Text>Hello {cleanerDetails.companyName}</Text>
				<Text>Current cleans</Text>
				<Text>
					You currently have {cleanerDetails.numberOfJobs || 0} clients
				</Text>
				<Text>You have been paid £{cleanerDetails.balance}</Text>
				<Text>Location: {cleanerDetails.companyCity}</Text>
				<StarRating
					disabled={true}
					maxStars={5}
					rating={cleanerDetails.rating}
					fullStarColor={"gold"}
					starStyle={{ paddingLeft: 20, paddingRight: 20, alignSelf: "center" }}
				/>
			</View>
		);
	}
};

export default Cleans;
