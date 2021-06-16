import { db, auth } from "../firebase";
import firebase from "firebase";
import { Card } from "react-native-elements";
import React from "react";
import { View, Pressable, ScrollView } from "react-native";
import { Button, Title, Text, Avatar } from "react-native-paper";

import { useState, useEffect } from "react";

const CleanersList = ({ setCleaner, navigation }) => {
	const [currCleaner, setCurrCleaner] = useState({});
	const [cleaners, setCleaners] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
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

	useEffect(() => {
		db.collection("cleaners")
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
	}, []);

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
										<Card.Title>{cleaner.companyName}</Card.Title>
										<Card.Divider />
										<View>
											<Text>{cleaner.companyDescription}</Text>
											<Text>{cleaner.companyCity}</Text>
										</View>
									</Card>
								</Pressable>
							);
						})}
					</ScrollView>
				</View>
			);
		}
	}
};

export default CleanersList;
