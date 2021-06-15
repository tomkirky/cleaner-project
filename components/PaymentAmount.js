import * as React from "react";
import { useState } from "react";
import { Button } from "react-native-paper";

const PaymentAmount = ({ navigation, setAmount }) => {
	return (
		<>
			<Button
				icon="credit-card-outline"
				mode="contained"
				onPress={() => {
					setAmount("five");
					navigation.navigate("Payments");
				}}
			>
				Pay £5
			</Button>
			<Button
				icon="credit-card-outline"
				mode="contained"
				onPress={() => {
					setAmount("ten");
					navigation.navigate("Payments");
				}}
			>
				Pay £10
			</Button>
			<Button
				icon="credit-card-outline"
				mode="contained"
				onPress={() => {
					setAmount("fifteen");
					navigation.navigate("Payments");
				}}
			>
				Pay £15
			</Button>
			<Button
				icon="credit-card-outline"
				mode="contained"
				onPress={() => {
					setAmount("twenty");
					navigation.navigate("Payments");
				}}
			>
				Pay £20
			</Button>
			<Button
				icon="credit-card-outline"
				mode="contained"
				onPress={() => {
					setAmount("twentyfive");
					navigation.navigate("Payments");
				}}
			>
				Pay £25
			</Button>
			<Button
				icon="credit-card-outline"
				mode="contained"
				onPress={() => {
					setAmount("thirty");
					navigation.navigate("Payments");
				}}
			>
				Pay £30
			</Button>
		</>
	);
};

export default PaymentAmount;
