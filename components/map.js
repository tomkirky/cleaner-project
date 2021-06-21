import * as React from "react";
import MapView from "react-native-maps";
import { Heatmap, Callout } from "react-native-maps";
import { StyleSheet, View, Dimensions, ActivityIndicator } from "react-native";
import axios from "axios";
import { googleMapsAPI } from "../googleMapsAPI";
import { useState, useEffect } from "react";
import firebase from "firebase";
import FancyButton from "./styling/fancyButton";

const Map = ({ loggedUserPostCode, navigation }) => {
	let heatmapPoints = [];
	const [points, setPoints] = useState([]);
	const [isGoogleLoading, setIsGoogleLoading] = useState(true);
	const [isFirebaseLoading, setIsFirebaseLoading] = useState(true);

	const [coordinates, setCoordinates] = useState({
		lat: 51.4444784,
		lng: -0.1599027,
	});

	useEffect(() => {
		firebase
			.firestore()
			.collection("clients")
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					const client = doc.data();
					heatmapPoints.push(client.weightedHeatMapPoints);
					setIsFirebaseLoading(false);
				});
				setPoints(heatmapPoints);
			});
	}, []);

	useEffect(() => {
		axios
			.get(
				`https://maps.googleapis.com/maps/api/geocode/json?address=${loggedUserPostCode}&key=${googleMapsAPI}`
			)
			.then((result) => {
				console.log(result);
				const { lat, lng } = result.data.results[0].geometry.location;
				setIsGoogleLoading(false);
				setCoordinates((currCoordinates) => {
					return { ...currCoordinates, lat: lat, lng: lng };
				});
			});
	}, []);

	if (isGoogleLoading || isFirebaseLoading) {
		return (
			<ActivityIndicator
				style={{ marginTop: 50 }}
				size="large"
				color="#2192BC"
			/>
		);
	} else {
		return (
			<View style={styles.container}>
				<MapView
					style={styles.map}
					initialRegion={{
						latitude: coordinates.lat,
						longitude: coordinates.lng,
						latitudeDelta: 0.07,
						longitudeDelta: 0.07,
					}}
				>
					<Heatmap
						points={points}
						opacity={1}
						radius={20}
						maxIntensity={100}
						gradientSmoothing={10}
						heatmapMode={"POINTS_DENSITY"}
					/>
				</MapView>
				<Callout style={styles.buttonCallout}>
					<FancyButton
						title="Continue to your profile"
						onPress={() => {
							navigation.navigate("HomeTabs");
						}}
					>
						Continue to your jobs
					</FancyButton>
				</Callout>
			</View>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 50,
	},
	map: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
	},
	buttonCallout: {
		flex: 1,
		flexDirection: "row",
		position: "absolute",
		bottom: 10,
		alignSelf: "center",
		justifyContent: "space-between",
		backgroundColor: "transparent",
		borderWidth: 0.5,
		borderRadius: 20,
	},
});

export default Map;
