import * as React from "react";
import MapView from "react-native-maps";
import { Heatmap, Circle } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import axios from "axios";
import { googleMapsAPI } from "../configgg";
import { useState, useEffect } from "react";

let heatmapPoints = [
	{ latitude: 51.430507, longitude: -0.181738, weight: 1 },
	{ latitude: 51.429859, longitude: -0.181116, weight: 1 },
	{ latitude: 51.429272, longitude: -0.1797593, weight: 1 },
	{ latitude: 51.453552, longitude: -0.144206, weight: 1 },
	{ latitude: 51.452819, longitude: -0.142235, weight: 1 },
	{ latitude: 51.451421, longitude: -0.142508, weight: 1 }
];

const Map = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [coordinates, setCoordinates] = useState({
		lat: 51.4444784,
		lng: -0.1599027
	});

	useEffect(() => {
		axios
			.get(
				`https://maps.googleapis.com/maps/api/geocode/json?address=24%20Sussex%20Drive%20Ottawa%20ON&key=${googleMapsAPI}`
			)
			.then((result) => {
				const { lat, lng } = result.data.results[0].geometry.location;
				setIsLoading(false);
				setCoordinates((currCoordinates) => {
					return { ...currCoordinates, lat: lat, lng: lng };
				});
			});
	}, []);

	console.log(coordinates.lat);
	// if (!isLoading) {
	const circleLatLong = {
		latitude: 51.4444784,
		longitude: -0.1599027
	};
	return (
		<View style={styles.container}>
			<MapView
				style={styles.map}
				initialRegion={{
					latitude: coordinates.lat,
					longitude: coordinates.lng,
					latitudeDelta: 0.07,
					longitudeDelta: 0.07
				}}
			>
				<Circle
					center={circleLatLong}
					radius={2000}
					strokeWidth={1}
					strokeColor={"#1a66ff"}
					fillColor={"rgba(230,238,255,0.5)"}
				/>
				<Heatmap
					points={heatmapPoints}
					opacity={1}
					radius={20}
					maxIntensity={100}
					gradientSmoothing={10}
					heatmapMode={"POINTS_DENSITY"}
				/>
			</MapView>
		</View>
	);
	// }
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	},
	map: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height
	}
});

export default Map;

// testing gitignore
