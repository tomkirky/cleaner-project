import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StripeProvider } from '@stripe/stripe-react-native';
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

if (firebase.apps.length === 0) {
	firebase.initializeApp(firebaseConfig);
}

import LandingScreen from "./components/landing";
import RegisterScreen from "./components/register";
import LoginScreen from "./components/login";
import HomeScreen from "./components/home";
import PaymentScreen from "./components/payment";
import MapScreen from "./components/map";

const Stack = createStackNavigator();

const App = () => {
  return (
  <StripeProvider publishableKey="pk_test_e0Q6gnF9VeDke03pyammLdOD">
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen
          name="Landing"
          component={LandingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Payments" component={PaymentScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </StripeProvider>
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
