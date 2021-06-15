import { db, auth } from "../firebase";
import firebase from "firebase";
import { Card } from "react-native-elements";
import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useState, useEffect } from "react";

const CleanersList = ({ setCleaner, navigation }) => {
	const [cleaners, setCleaners] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const list = [];

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
				console.log(list);
			});
	}, []);
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
};

export default CleanersList;
