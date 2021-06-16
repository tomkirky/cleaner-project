import { db, auth } from "../firebase";
import firebase from "firebase";
import { Card } from "react-native-elements";
import React from "react";
import { Title, Avatar } from "react-native-paper";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import StarRating from "react-native-star-rating";

const CleanersList = ({ setCleaner, navigation }) => {
	const [cleaners, setCleaners] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const [currentCity, setCurrentCity] = useState("Leeds");
	const list = [];

	const ID = auth.currentUser.uid;
	const docRef = db.collection("clients").doc(`${ID}`);

	useEffect(() => {
		docRef.get().then((doc) => {
			if (doc.exists) {
				setCurrentCity(doc.data().city);
			} else {
				// doc.data() will be undefined in this case
				console.log("No such document!");
			}
		});
	}, []);

	useEffect(() => {
		db.collection("cleaners")
			.where("companyCity", "==", currentCity)
			.get()
			.then((result) => {
				result.forEach((doc) => {
					const person = doc.data();
					person.id = doc.id;
					list.push(person);
				});
				setCleaners(list);
				setIsLoading(false);
			});
	}, [currentCity]);
	if (isLoading) {
		return <Text>Loading...</Text>;
	} else {
		return (
			<View>
				<Title style={{ padding: 10, alignSelf: "center" }}>
					Here are all the cleaners in your area
				</Title>
				<ScrollView>
					{cleaners.map((cleaner) => {
						return (
							<Pressable
								onPress={() => {
									setCleaner(cleaner);
									navigation.navigate("Profile");
								}}
							>
								<Card>
									<Avatar.Image
										size={150}
										source={{
											uri: cleaner.cleanerPhotoURL
										}}
										style={{ margin: 5, alignSelf: "center" }}
									/>
									<Card.Title>{cleaner.companyName}</Card.Title>

									<Card.Divider />
									<View>
										<StarRating
											disabled={true}
											maxStars={5}
											rating={3} // rating will be added from db
											fullStarColor={"gold"}
											starSize={25}
											starStyle={{
												paddingLeft: 20,
												paddingRight: 20,

												alignSelf: "center"
											}}
										/>
									</View>
								</Card>
							</Pressable>
						);
					})}
				</ScrollView>
			</View>
		);
	}
};

export default CleanersList;
