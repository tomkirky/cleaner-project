import * as React from "react";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { db, auth } from "../firebase";
import firebase from "firebase";
import FancyButton from "./styling/fancyButton";

const PaymentAmount = ({ navigation, setAmount, cleaner }) => {
	const [money, setMoney] = useState();

	const addPaymentInfoToDB = () => {
		const inc = money;
		db.collection("cleaners")
			.doc(cleaner.id)
			.update({
				balance: firebase.firestore.FieldValue.increment(Number(inc)),
			});
	};




	return (
		<View style={styles.container}>
			<FancyButton
				icon="credit-card-outline"
				mode="contained"
				onPress={() => {
					setAmount("five");
					setMoney(5);
					addPaymentInfoToDB();
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
					setMoney(10);
					addPaymentInfoToDB();
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
					setMoney(15);
					addPaymentInfoToDB();
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
					setMoney(20);
					addPaymentInfoToDB();
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
					setMoney(25);
					addPaymentInfoToDB();
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
					setMoney(30);
					addPaymentInfoToDB();
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
		padding: 20
		// backgroundColor: "#ffffff"
	}
});

export default PaymentAmount;
