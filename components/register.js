import React, { useState } from "react";
import { ClientSignupForm } from "./registrationforms/clientRegForm";
import { CleanerSignupForm } from "./registrationforms/cleanersRegForm";
import { db, auth } from "../firebase";
import axios from "axios";
import { ActivityIndicator } from "react-native";
import { googleMapsAPI } from "../googleMapsAPI";

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
			weight: 1,
		},
		photoURL:
			"https://www.pikpng.com/pngl/m/80-805523_default-avatar-svg-png-icon-free-download-264157.png",
	});

	const [cleanerRegisterDetails, setCleanerRegisterDetails] = useState({
		companyName: "",
		companyPostcode: "",
		companyEmail: "",
		companyPassword: "",
		companyDescription: "",
		companyCity: "",
		cleanerPhotoURL:
			"http://clipart-library.com/new_gallery/44-448154_cleaning-clipart-worker-window-cleaning-clip-art.png",
		balance: 0,
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
			city,
		} = clientRegisterDetails;
		const {
			companyName,
			companyPostcode,
			companyEmail,
			companyPassword,
			companyCity,
			companyDescription,
			cleanerPhotoURL,
			balance,
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
								weight: 1,
							},
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
						city,
					});
					navigation.navigate("HomeTabs");
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
						cleanerPhotoURL,
						balance,
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

	if (isLoading) {
		return (
			<ActivityIndicator
				style={{ marginTop: 50 }}
				size="large"
				color="#2192BC"
			/>
		);
	} else if (userType === "client") {
		return (
			<ClientSignupForm
				setClientRegisterDetails={setClientRegisterDetails}
				onRegister={onRegister}
			/>
		);
	} else {
		return (
			<CleanerSignupForm
				setCleanerRegisterDetails={setCleanerRegisterDetails}
				onRegister={onRegister}
			/>
		);
	}
};

export default Register;
