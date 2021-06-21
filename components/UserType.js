import React from "react";
import { View, StyleSheet } from "react-native";
import "react-native-gesture-handler";
import FancyButton from "./styling/fancyButton";

const UserType = ({ navigation, setUserType }) => {
	function onPressHandler(user) {
		navigation.navigate("Register");
		setUserType(user);
	}

	return (
		<View style={styles.container}>
			<View style={styles.button}>
				<FancyButton
					title="window cleaner"
					color="blue"
					mode="contained"
					onPress={() => onPressHandler("cleaner")}
				>
					I am a window cleaner
				</FancyButton>
			</View>
			<View style={styles.button}>
				<FancyButton
					color="blue"
					mode="contained"
					onPress={() => onPressHandler("client")}
				>
					I have dirty windows
				</FancyButton>
			</View>
			{/* <View style={styles.button}>
				<Button
					color="blue"
					mode="contained"
					onPress={() => navigation.navigate("Login")}
				>
					Or Login
				</Button>
			</View> */}
			{/* <View style={styles.button}>
				<Button
					color="blue"
					mode="contained"
					onPress={() => navigation.navigate("CleanersList")}
				>
					Cleaners
				</Button>
			</View> */}
		</View>
	);
};
export default UserType;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		marginTop: 50,
	},
	button: {
		marginLeft: 10,
		marginRight: 10,
		marginBottom: 80,
	},
});
