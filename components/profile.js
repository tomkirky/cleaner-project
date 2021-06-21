import { useState } from "react";
import React from "react";
import { db, auth } from "../firebase";
import firebase from "firebase";
import { View } from "react-native";
import { Button, Title, Text, Avatar } from "react-native-paper";
import StarRating from "react-native-star-rating";
import FancyButton from "./styling/fancyButton";

const Profile = ({ cleaner, navigation }) => {
	const [totalRating, setTotalRating] = useState(cleaner.rating);
	const [userReview, setUserReview] = useState(0);

	const onStarRatingPress = (rating) => {
		setUserReview(rating);
		setTotalRating((rating + totalRating) / 2);
	};

	console.log(auth.currentUser.uid);

	const submitCleaner = () => {
		db.collection("clients").doc(auth.currentUser.uid).update({
			hasCleaner: true,
			currentCleaner: cleaner.companyName,
			dateOfPayment: new Date(),
		});
		db.collection("cleaners")
			.doc(cleaner.id)
			.update({
				numberOfJobs: firebase.firestore.FieldValue.increment(1),
			});
		console.log("this has run");
	};

	return (
		<View style={{ marginTop: 50 }}>
			<Avatar.Image
				size={150}
				source={{
					uri:
						cleaner.cleanerPhotoURL ||
						"http://clipart-library.com/new_gallery/44-448154_cleaning-clipart-worker-window-cleaning-clip-art.png ",
				}}
				style={{ margin: 25, alignSelf: "center" }}
			/>
			<Title style={{ padding: 10, alignSelf: "center" }}>
				{cleaner.companyName}
			</Title>
			<Text style={{ padding: 10, alignSelf: "center" }}>
				{cleaner.companyDescription}
			</Text>
			<Text style={{ padding: 10, alignSelf: "center" }}>User Rating</Text>
			<StarRating
				disabled={true}
				maxStars={5}
				rating={totalRating}
				fullStarColor={"gold"}
				starStyle={{ paddingLeft: 20, paddingRight: 20, alignSelf: "center" }}
			/>
			<Text style={{ padding: 10, alignSelf: "center" }}>
				Submit a review for {cleaner.companyName}
			</Text>
			<StarRating
				disabled={false}
				maxStars={5}
				rating={userReview}
				fullStarColor={"gold"}
				selectedStar={(rating) => onStarRatingPress(rating)}
				starStyle={{ paddingLeft: 20, paddingRight: 20, alignSelf: "center" }}
			/>
			<FancyButton
				icon="message-outline"
				mode="contained"
				onPress={() => navigation.navigate("Chat")}
			>
				Chat to {cleaner.companyName}
			</FancyButton>
			<Button
				icon="credit-card-outline"
				mode="contained"
				color="green"
				style={{ padding: 10, justifyContent: "center", margin: 10 }}
				onPress={() => {
					submitCleaner();
					navigation.navigate("PaymentAmount");
				}}
			>
				Pay {cleaner.companyName}
			</Button>
		</View>
	);
};

export default Profile;
