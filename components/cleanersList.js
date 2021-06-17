import { db, auth } from "../firebase";
import firebase from "firebase";
import { Card } from "react-native-elements";
import React from "react";
import { View, Pressable, ScrollView } from "react-native";
import { Button, Title, Text, Avatar } from "react-native-paper";
import { useState, useEffect } from "react";
import StarRating from "react-native-star-rating";
import FancyButton from "./styling/fancyButton";

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
			<View style={{ marginTop: 50 }}>
				<Avatar.Image
					size={150}
					source={{
						uri: currCleaner.photoURL,
					}}
					style={{ margin: 25, alignSelf: "center" }}
				/>
				<Title style={{ padding: 10, alignSelf: "center" }}>
					{" "}
					Hello {currCleaner.name}
				</Title>
				<Title style={{ padding: 10, alignSelf: "center" }}>
					Your current cleaner is {currCleaner.currentCleaner}
				</Title>

				<Card>
					<Text>Last payment sent at {Date(currCleaner.dateOfPayment)}</Text>
				</Card>
				<View style={{ margin: 20, alignSelf: "center" }}>
					<Text style={{ padding: 10, alignSelf: "center" }}>
						{currCleaner.currentCleaner} will clean your windows 2 days after
						payment has cleared
					</Text>
				</View>
				<View>
					<FancyButton
						onPress={() => {
							removeCleaner();
						}}
					>
						Remove Cleaner
					</FancyButton>
				</View>
			</View>
		);
	} else {
		if (isLoading) {
			return <Text style={{ marginTop: 50 }}>Loading...</Text>;
		} else {
			return (
				<View style={{ marginTop: 50 }}>
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
						<View style={{ marginBottom: 70 }} />
					</ScrollView>
				</View>
			);
		}
	}
};

export default CleanersList;
