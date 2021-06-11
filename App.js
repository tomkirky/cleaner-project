import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { View, Text } from "react-native";

// import * as firebase from "firebase";
import firebase from "firebase/app";

const firebaseConfig = {
	apiKey: "AIzaSyCypVoinAdRkCENQfn2AqR6ebT-11sovAs",
	authDomain: "cleaner-3207e.firebaseapp.com",
	projectId: "cleaner-3207e",
	storageBucket: "cleaner-3207e.appspot.com",
	messagingSenderId: "98775205470",
	appId: "1:98775205470:web:0d767f25351083f90556cf",
	measurementId: "G-MC62M5YJD9",
};
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LandingScreen from "./components/landing";
import RegisterScreen from "./components/register";
import LoginScreen from "./components/login";
import HomeScreen from "./components/home";
// if (firebase.apps.length === 0) {
//   firebase.initializeApp(firebaseConfig);
// }
import PaymentScreen from "./components/payment";
import MapScreen from "./components/map";
import UserType from "./components/UserType";
import { useState } from "react";
const db = firebase.initializeApp(firebaseConfig).firestore(); // <--- changed from if stetement above
const Stack = createStackNavigator();

const App = () => {
	const [userType, setUserType] = useState("");
	var citiesRef = db.collection("cities");

	citiesRef.doc("SF").set({
		name: "San Francisco",
		state: "CA",
		country: "USA",
		capital: false,
		population: 860000,
		regions: ["west_coast", "norcal"],
	});
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="UserType">
				<Stack.Screen
					name="Landing"
					component={LandingScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Register"
					options={{ title: `Please enter ${userType} details` }}
				>
					{(props) => (
						<RegisterScreen
							{...props}
							userType={userType}
							setUserType={setUserType}
						/>
					)}
				</Stack.Screen>
				<Stack.Screen name="Login" component={LoginScreen} />
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="Payments" component={PaymentScreen} />
				<Stack.Screen name="Map" component={MapScreen} />
				<Stack.Screen
					name="UserType"
					options={{ title: `Please enter ${userType} details` }}
				>
					{(props) => (
						<UserType
							{...props}
							userType={userType}
							setUserType={setUserType}
						/>
					)}
				</Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
// start here
// export default class App extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			loaded: false,
// 		};
// 	}
// 	componentDidMount() {
// 		firebase.auth().onAuthStateChanged((user) => {
// 			if (!user) {
// 				this.setState({
// 					loggedIn: false,
// 					loaded: true,
// 				});
// 			} else {
// 				this.setState({
// 					loggedIn: true,
// 					loaded: true,
// 				});
// 			}
// 		});
// 	}
// 	render() {
// 		const { loggedIn, loaded } = this.state;
// 		if (!loaded) {
// 			return (
// 				<View>
// 					<Text style={{ flex: 1, justifyContent: "center" }}>Loading</Text>
// 				</View>
// 			);
// 		}
// 		return (
// 			<NavigationContainer>
// 				<Stack.Navigator initialRouteName="Landing">
// 					<Stack.Screen
// 						name="Landing"
// 						component={LandingScreen}
// 						options={{ headerShown: false }}
// 					/>
// 					<Stack.Screen name="Register" component={RegisterScreen} />
// 				</Stack.Navigator>
// 			</NavigationContainer>
// 		);
// 	}
// }
//ends here
