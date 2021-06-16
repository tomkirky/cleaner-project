import * as React from "react";
import MapView from "react-native-maps";
import { Heatmap, Circle } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import axios from "axios";
import { googleMapsAPI } from "../googleMapsAPI";
import { useState, useEffect } from "react";
import firebase from "firebase";
// import Slider from "@react-native-community/slider";
import postcodeFormatter from "../utils/utils";

const Map = ({ loggedUserPostCode }) => {
	let heatmapPoints = [
		{
			latitude: 53.4805634,
			longitude: -2.237148,
			weight: 1
		},
		{ latitude: 53.483298, longitude: -2.231452, weight: 1 },
		{
			latitude: 53.483183,
			longitude: -2.2304719,
			weight: 1
		}
	];
	console.log(loggedUserPostCode, "<== cleaner postcode");
	const [points, setPoints] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [coordinates, setCoordinates] = useState({
		lat: 51.4444784,
		lng: -0.1599027,
	});
	// const [circleRadius, setCircleRadius] = useState({
	// 	value: [0.2, 0.5]
	// });

	/////////////////////////////////////
	// useEffect(() => {
	// 	firebase
	// 		.firestore()
	// 		.collection("clients")
	// 		.get()
	// 		.then((querySnapshot) => {
	// 			querySnapshot.forEach((doc) => {
	// 				heatmapPoints.push(doc.data.weightedHeatMapPoints); // check this line
	// 				// console.log(doc.id, " => ", doc.data());
	// 			});
	// 			setPoints(heatmapPoints);
	// 		});
	// }, []);
	/////////////////////////////////////

	useEffect(() => {
		axios
			.get(
				`https://maps.googleapis.com/maps/api/geocode/json?address=M1 1ED&key=${googleMapsAPI}`
			)
			.then((result) => {
				const { lat, lng } = result.data.results[0].geometry.location;
				setIsLoading(false);
				setCoordinates((currCoordinates) => {
					return { ...currCoordinates, lat: lat, lng: lng };
				});
			});
	}, []);

	// console.log(coordinates.lat);
	// const circleLatLong = {
	// 	latitude: coordinates.lat,
	// 	longitude: coordinates.lng
	// };
	if (isLoading) {
		return <Text>...loading</Text>;
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
					{/* <Circle
						center={circleLatLong}
						radius={2000}
						strokeWidth={1}
						strokeColor={"#1a66ff"}
						fillColor={"rgba(230,238,255,0.5)"}
					/> */}
					<Heatmap
						points={heatmapPoints}
						opacity={1}
						radius={20}
						maxIntensity={100}
						gradientSmoothing={10}
						heatmapMode={"POINTS_DENSITY"}
					/>
				</MapView>
				{/* <Slider
					maximumValue={100}
					minimumValue={0}
					minimumTrackTintColor="#307ecc"
					maximumTrackTintColor="#000000"
					step={1}
					value={circleRadius}
					onValueChange={(circleRadius) => setCircleRadius(circleRadius)}
				/> */}
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
	},
	map: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
	},
});

export default Map;

// testing gitignore
