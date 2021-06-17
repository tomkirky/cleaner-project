import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button, Header } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { CleanerContext } from "./contexts/Cleaner";
import { auth } from "./firebase";

// import * as firebase from "firebase";
// if (firebase.apps.length === 0) {
//   firebase.initializeApp(firebaseConfig);
// }

import LandingScreen from "./components/landing";
import RegisterScreen from "./components/register";
import LoginScreen from "./components/login";
import HomeScreen from "./components/home";
import PaymentScreen from "./components/payment";
import MapScreen from "./components/map";
import ChatScreen from "./components/ChatScreen";
import UserType from "./components/UserType";
import CleanersList from "./components/cleanersList";
import Profile from "./components/profile";
import { useState } from "react";
import PaymentAmount from "./components/PaymentAmount";
import Navbar from "./components/navbar";
import Cleans from "./components/cleans";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import LogoScreen from "./components/logoScreen";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function getHeaderTitle(route) {
	// If the focused route is not found, we need to assume it's the initial screen
	// This can happen during if there hasn't been any navigation inside the screen
	// In our case, it's "Feed" as that's the first screen inside the navigator
	const routeName = getFocusedRouteNameFromRoute(route) ?? "Cleaners";

	switch (routeName) {
		case "Cleaners":
			return "Cleaners";
		case "Chat":
			return "Chat";
	}
}

export const HomeTabs = ({ navigation, setCleaner, cleaner }) => {
	console.log(auth.currentUser.uid);
	if (auth.currentUser.uid !== "9PItny4p8CSXhAsuiVAnyvIdClE2") {
		return (
			<Tab.Navigator barStyle={{ backgroundColor: "#2192BC" }}>
				<Tab.Screen
					options={{ tabBarIcon: "pail-outline" }}
					name="Cleans"
					component={Cleans}
				/>
				<Tab.Screen
					options={{ tabBarIcon: "chat-outline" }}
					name="Chat"
					component={ChatScreen}
				/>
			</Tab.Navigator>
		);
	} else {
		return (
			<Tab.Navigator barStyle={{ backgroundColor: "#2192BC" }}>
				<Tab.Screen options={{ tabBarIcon: "pail-outline" }} name="Cleaners">
					{(props) => (
						<CleanersList
							{...props}
							setCleaner={setCleaner}
							cleaner={cleaner}
						/>
					)}
				</Tab.Screen>
				<Tab.Screen
					options={{ tabBarIcon: "chat-outline" }}
					name="Chat"
					component={ChatScreen}
				/>
			</Tab.Navigator>
		);
	}
};

const App = ({ navigation }) => {
	const [userType, setUserType] = useState("");
	const [loggedUserPostCode, setLoggedUserPostCode] = useState("");
	const [amount, setAmount] = useState("");
	const [cleaner, setCleaner] = useState({});

	return (
		<>
			<CleanerContext.Provider value={{ cleaner, setCleaner }}>
				<NavigationContainer>
					<Stack.Navigator initialRouteName="Logo">
						<Stack.Screen
							name="Logo"
							component={LogoScreen}
							options={{
								cardStyle: { backgroundColor: "#FFFFFF" },
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name="Login"
							component={LoginScreen}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="Landing"
							component={LandingScreen}
							options={{ headerShown: false }}
						/>
						<Stack.Screen name="Register" options={{ headerShown: false }}>
							{(props) => (
								<RegisterScreen
									{...props}
									userType={userType}
									setUserType={setUserType}
									setLoggedUserPostCode={setLoggedUserPostCode}
								/>
							)}
						</Stack.Screen>
						<Stack.Screen
							name="Cleaners"
							component={CleanersList}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="HomeTabs"
							options={({ route }) => ({
								headerTitle: getHeaderTitle(route),
								headerShown: false,
							})}
						>
							{(props) => (
								<HomeTabs
									{...props}
									setCleaner={setCleaner}
									cleaner={cleaner}
								/>
							)}
						</Stack.Screen>
						<Stack.Screen
							name="Home"
							component={HomeScreen}
							options={{ headerShown: false }}
						/>
						<Stack.Screen name="Payments" options={{ headerShown: false }}>
							{(props) => <PaymentScreen {...props} amount={amount} />}
						</Stack.Screen>
						<Stack.Screen name="Map" options={{ headerShown: false }}>
							{(props) => (
								<MapScreen {...props} loggedUserPostCode={loggedUserPostCode} />
							)}
						</Stack.Screen>
						<Stack.Screen name="PaymentAmount" options={{ headerShown: false }}>
							{(props) => (
								<PaymentAmount
									{...props}
									cleaner={cleaner}
									setAmount={setAmount}
								/>
							)}
						</Stack.Screen>
						<Stack.Screen
							name="UserType"
							options={{
								title: `Please enter ${userType} details`,
								headerShown: false,
							}}
						>
							{(props) => (
								<UserType
									{...props}
									userType={userType}
									setUserType={setUserType}
								/>
							)}
						</Stack.Screen>
						<Stack.Screen name="Profile" options={{ headerShown: false }}>
							{(props) => <Profile {...props} cleaner={cleaner} />}
						</Stack.Screen>
						<Stack.Screen
							name="Cleans"
							component={Cleans}
							options={{ headerShown: false }}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</CleanerContext.Provider>
		</>
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

// var citiesRef = db.collection("cities");

// citiesRef.doc("SF").set({
// 	name: "San Francisco",
// 	state: "CA",
// 	country: "USA",
// 	capital: false,
// 	population: 860000,
// 	regions: ["west_coast", "norcal"],
// });
