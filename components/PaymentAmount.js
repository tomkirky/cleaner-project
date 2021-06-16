import * as React from "react";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import FancyButton from "./styling/fancyButton";

const PaymentAmount = ({ navigation, setAmount }) => {
	return (
		<View style={styles.container}>
			<FancyButton
				icon="credit-card-outline"
				mode="contained"
				onPress={() => {
					setAmount("five");
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
