import * as React from "react";
import { View, StyleSheet } from "react-native";
import { db } from "../firebase";
import firebase from "firebase";
import FancyButton from "./styling/fancyButton";

const PaymentAmount = ({ navigation, setAmount, cleaner }) => {
	const addPaymentInfoToDB = (number) => {
		db.collection("cleaners")
			.doc(cleaner.id)
			.update({
				balance: firebase.firestore.FieldValue.increment(number),
			});
	};

	return (
		<View style={styles.container}>
			<FancyButton
				icon="credit-card-outline"
				mode="contained"
				onPress={() => {
					setAmount("five");
					addPaymentInfoToDB(5);
					navigation.navigate("Payments");
				}}
			>
				Pay £5
			</FancyButton>
			<FancyButton
				icon="credit-card-outline"
				mode="contained"
				onPress={() => {
					setAmount("ten");
					addPaymentInfoToDB(10);
					navigation.navigate("Payments");
				}}
			>
				Pay £10
			</FancyButton>
			<FancyButton
				icon="credit-card-outline"
				mode="contained"
				onPress={() => {
					setAmount("fifteen");
					addPaymentInfoToDB(15);
					navigation.navigate("Payments");
				}}
			>
				Pay £15
			</FancyButton>
			<FancyButton
				icon="credit-card-outline"
				mode="contained"
				onPress={() => {
					setAmount("twenty");
					addPaymentInfoToDB(20);
					navigation.navigate("Payments");
				}}
			>
				Pay £20
			</FancyButton>
			<FancyButton
				icon="credit-card-outline"
				mode="contained"
				onPress={() => {
					setAmount("twentyfive");
					addPaymentInfoToDB(25);
					navigation.navigate("Payments");
				}}
			>
				Pay £25
			</FancyButton>
			<FancyButton
				icon="credit-card-outline"
				mode="contained"
				onPress={() => {
					setAmount("thirty");
					addPaymentInfoToDB(30);
					navigation.navigate("Payments");
				}}
			>
				Pay £30
			</FancyButton>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		flex: 1,
		padding: 20,
		marginTop: 50,
	},
});

export default PaymentAmount;
