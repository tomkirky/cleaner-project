import { db, auth } from "../firebase";
import firebase from "firebase";
import { Card } from "react-native-elements";
import React from "react";
import { View, Pressable, ScrollView } from "react-native";
import { Button, Title, Text, Avatar } from "react-native-paper";
import { useState, useEffect } from "react";
import StarRating from "react-native-star-rating";

const CleanersList = ({ setCleaner, navigation }) => {
	const [currCleaner, setCurrCleaner] = useState({});
	const [cleaners, setCleaners] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [currentCity, setCurrentCity] = useState("Leeds");
	const list = [];

	const removeCleaner = () => {
		db.collection("clients")
			.doc(auth.currentUser.uid)
			.update({
				hasCleaner: false,
				currentCleaner: "",
				dateOfPayment: "",
			})
			.then(() => {
				setCurrCleaner((currCleaner) => {
					return { ...currCleaner, hasCleaner: false };
				});
			});
	};

	useEffect(() => {
		db.collection("clients")
			.doc(auth.currentUser.uid)
			.get()
			.then((doc) => {
				setCurrCleaner(doc.data());
				setIsLoading(false);
			});
	}, []);

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

	if (currCleaner.hasCleaner === true) {
		return (
			<View>
				<Text>Your Cleaner</Text>
				<Text>Your cleaner is {currCleaner.currentCleaner}</Text>
				<Text>Last payment sent at {Date(currCleaner.dateOfPayment)}</Text>
				<Text>
					{currCleaner.currentCleaner} will clean your windows 2 days after
					payment has cleared
				</Text>
				<View>
					<Button
						onPress={() => {
							removeCleaner();
						}}
					>
						Remove Cleaner
					</Button>
				</View>
			</View>
		);
	} else {
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
												uri: cleaner.cleanerPhotoURL,
											}}
											style={{ margin: 5, alignSelf: "center" }}
										/>
										<Card.Title>{cleaner.companyName}</Card.Title>

										<Card.Divider />
										<View>
											<StarRating
												disabled={true}
												maxStars={5}
												rating={cleaner.rating}
												fullStarColor={"gold"}
												starSize={25}
												starStyle={{
													paddingLeft: 20,
													paddingRight: 20,

													alignSelf: "center",
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
			// } else {
			// 	if (isLoading) {
			// 		return <Text>Loading...</Text>;
			// 	} else {
			// 		return (
			// 			<View>
			// 				<ScrollView>
			// 					{cleaners.map((cleaner) => {
			// 						return (
			// 							<Pressable
			// 								onPress={() => {
			// 									setCleaner(cleaner);
			// 									navigation.navigate("Profile");
			// 								}}
			// 							>
			// 								<Card>
			// 									<Card.Title>{cleaner.companyName}</Card.Title>
			// 									<Card.Divider />
			// 									<View>
			// 										<Text>{cleaner.companyDescription}</Text>
			// 										<Text>{cleaner.companyCity}</Text>
			// 									</View>
			// 								</Card>
			// 							</Pressable>
			// 						);
			// 					})}
			// 				</ScrollView>
			// 			</View>
			// 		);
			// 	}
		}
	}
};

export default CleanersList;
