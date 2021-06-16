import React, { useState } from "react";
import { ClientSignupForm } from "./registrationforms/clientRegForm";
import { CleanerSignupForm } from "./registrationforms/cleanersRegForm";
import firebase from "firebase";
import { useEffect } from "react";
import { db, auth } from "../firebase";
import axios from "axios";
import { Text, StyleSheet, View } from "react-native";
import { googleMapsAPI } from "../googleMapsAPI";
import { postcodeFormatter } from "../utils/utils";
// import { db } from "../App";

const Register = ({ userType, navigation, setLoggedUserPostCode }) => {
	const [clientRegisterDetails, setClientRegisterDetails] = useState({
		name: "",
		postcode: "",
		city: "",
		email: "",
		password: "",
		weightedHeatMapPoints: {
			latitude: 1,
			longitude: 1,
			weight: 1
		},
		photoURL:
			"https://www.pikpng.com/pngl/m/80-805523_default-avatar-svg-png-icon-free-download-264157.png"
	});

	const [cleanerRegisterDetails, setCleanerRegisterDetails] = useState({
		companyName: "",
		companyPostcode: "",
		companyEmail: "",
		companyPassword: "",
		companyDescription: "",
		companyCity: "",
		cleanerPhotoURL:
			"http://clipart-library.com/new_gallery/44-448154_cleaning-clipart-worker-window-cleaning-clip-art.png"
	});

	const [isLoading, setIsLoading] = useState(false);

	const onRegister = () => {
		const {
			name,
			postcode,
			email,
			password,
			weightedHeatMapPoints,
			photoURL,
			city
		} = clientRegisterDetails;
		const {
			companyName,
			companyPostcode,
			companyEmail,
			companyPassword,
			companyCity,
			companyDescription,
			cleanerPhotoURL
		} = cleanerRegisterDetails;

		if (userType === "client") {
			axios
				.get(
					`https://maps.googleapis.com/maps/api/geocode/json?address=${postcode}&key=${googleMapsAPI}`
				)
				.then((result) => {
					const { lat, lng } = result.data.results[0].geometry.location;
					const city = result.data.results[0].address_components[1].long_name;
					setIsLoading(true);
					setClientRegisterDetails((currClientRegisterDetails) => {
						return {
							...currClientRegisterDetails,
							city,
							weightedHeatMapPoints: {
								latitude: lat,
								longitude: lng,
								weight: 1
							}
						};
					});
					setIsLoading(false);
				});
			auth
				.createUserWithEmailAndPassword(email, password)
				.then((userCredential) => {
					const user = userCredential.user;
					user.updateProfile({ photoURL });
				})
				.then(() => {
					db.collection("clients").doc(auth.currentUser.uid).set({
						name,
						postcode,
						email,
						weightedHeatMapPoints,
						photoURL,
						city
					});
					navigation.navigate("Home");
				})
				.catch((error) => {
					if (error.code === "auth/invalid-email") {
						console.log("That email address is invalid!");
					}
					console.log(error); // NEED TO DISPLAY ERROR.MESSAGE
				});
		} else {
			setLoggedUserPostCode(companyPostcode);
			auth
				.createUserWithEmailAndPassword(companyEmail, companyPassword)
				.then((userCredential) => {
					const user = userCredential.user;
					user.updateProfile({ photoURL: cleanerPhotoURL });
				})
				.then(() => {
					db.collection("cleaners").doc(auth.currentUser.uid).set({
						companyName,
						companyPostcode,
						companyEmail,
						companyDescription,
						companyCity,
						cleanerPhotoURL
					});
					navigation.navigate("Map");
				})
				.catch((error) => {
					if (error.code === "auth/invalid-email") {
						console.log("That email address is invalid!");
					}
					console.log(error); // NEED TO DISPLAY ERROR.MESSAGE
				});
		}
	};

	///////////////////////////////////// vvv THIS NEEDS TO GO INTO OTHER SCREEN - CLEANER LIST???
	// var usersRef = firebase.firestore().collection("users");
	// var query = usersRef.where("postcode", "==", "Manchester");
	// useEffect(() => {
	// 	firebase
	// 		.firestore()
	// 		.collection("users")
	// 		.where("postcode", "==", "Manchester")
	// 		.get()
	// 		.then((querySnapshot) => {
	// 			querySnapshot.forEach((doc) => {
	// 				// doc.data() is never undefined for query doc snapshots
	// 				console.log(doc.id, " => ", doc.data());
	// 			});
	// 		});
	// }, []);
	////////////////////////////////////
	if (isLoading) {
		return <Text>...loading</Text>;
	} else if (userType === "client") {
		return (
			<View style={styles.container}>
				<ClientSignupForm
					setClientRegisterDetails={setClientRegisterDetails}
					onRegister={onRegister}
				/>
			</View>
		);
	} else {
		return (
			<View style={styles.container}>
				<CleanerSignupForm
					setCleanerRegisterDetails={setCleanerRegisterDetails}
					onRegister={onRegister}
				/>
			</View>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		flex: 1,
		padding: 20
		// backgroundColor: "#ffffff"
	}
});

export default Register;
