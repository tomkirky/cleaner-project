import React, { useState } from "react";
import { ClientSignupForm } from "./registrationforms/clientRegForm";
import { CleanerSignupForm } from "./registrationforms/cleanersRegForm";
import firebase from "firebase";
import { useEffect } from "react";
import { db, auth } from "../firebase";
import axios from "axios";
import { Text } from "react-native";
import { googleMapsAPI } from "../googleMapsAPI";
import { postcodeFormatter } from "../utils/utils";
// import { db } from "../App";

const Register = ({ userType, navigation }) => {
	const [clientRegisterDetails, setClientRegisterDetails] = useState({
		name: "",
		postcode: "",
		username: "",
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
		companyPhoneNumber: "",
		companyEmail: "",
		companyPassword: "",
		companyDescription: "",
		cleanerPhotoURL:
			"https://www.pikpng.com/pngl/m/80-805523_default-avatar-svg-png-icon-free-download-264157.png"
	});

	const [isLoading, setIsLoading] = useState(false);

	// console.log(postcodeFormatter(clientRegisterDetails.postcode));

	console.log(
		clientRegisterDetails.weightedHeatMapPoints,
		"weighted heat map points"
	);
	const onRegister = () => {
		const {
			name,
			postcode,
			username,
			email,
			password,
			weightedHeatMapPoints,
			photoURL
		} = clientRegisterDetails;
		const {
			companyName,
			companyPostcode,
			companyPhoneNumber,
			companyEmail,
			companyPassword,
			companyDescription
		} = cleanerRegisterDetails;

		if (userType === "client") {
			console.log(postcode, "postcode");
			axios
				.get(
					`https://maps.googleapis.com/maps/api/geocode/json?address=${postcode}&key=${googleMapsAPI}`
				)
				.then((result) => {
					console.log(result.data.results[0].geometry.location, "lat & long");
					const { lat, lng } = result.data.results[0].geometry.location;
					setIsLoading(true);
					setClientRegisterDetails((currClientRegisterDetails) => {
						return {
							...currClientRegisterDetails,
							weightedHeatMapPoints: {
								latitude: lat,
								longitude: lng,
								weight: 1
							}
						};
					});
					setIsLoading(false);
				});
			console.log(weightedHeatMapPoints, "this is after axios request");
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
						username,
						email,
						weightedHeatMapPoints,
						photoURL
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
			auth
				.createUserWithEmailAndPassword(companyEmail, companyPassword)
				.then(() => {
					db.collection("cleaners").doc(auth.currentUser.uid).set({
						companyName,
						companyPostcode,
						companyPhoneNumber,
						companyEmail,
						companyDescription
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

// export class Register extends Component {
// 	constructor(props) {
// 		super(props);

// 		this.state = {
// 			email: "",
// 			password: "",
// 			name: "",
// 		};

// 		this.onSignUp = this.onSignUp.bind(this);
// 	}

//     onSignUp() {
//         const { email, password, name} = this.state;
// 		firebase.auth().createUserWithEmailAndPassword(email, password)
// 		.then((result) => {
// 			console.log(result)
// 		})
// 		.catch((error) => {
// 			console.log(error)
// 		})
//     }

// 	render() {
// 		return (
// 			<View>
// 				<TextInput
// 					placeholder="name"
// 					onChangeText={(name) => this.setState({ name })}
// 				/>
// 				<TextInput
// 					placeholder="email"
// 					onChangeText={(email) => this.setState({ email })}
// 				/>
// 				<TextInput
// 					placeholder="password"
// 					secureTextEntry={true}
// 					onChangeText={(password) => this.setState({ password })}
// 				/>

// 				<Button onPress={() => this.onSignUp()} title="Sign Up" />
// 			</View>
// 		);
// 	}
// }

export default Register;
