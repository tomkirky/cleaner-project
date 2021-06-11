import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import "react-native-gesture-handler";

const UserType = ({navigation, setUserType}) => {

    function onPressHandler(user) {
        navigation.navigate("Register");
        setUserType(user);
    }

    return (
        <View style={styles.container}>
            <View style={styles.button}>
                <Button
                    title="window cleaner"
                    color="blue"
                    mode="contained"
                    onPress={() => onPressHandler("cleaner")}
                >
                    I am a window cleaner
                </Button>
            </View>
            <View style={styles.button}>
                <Button
                    color="blue"
                    mode="contained"
                    onPress={() => onPressHandler("customer")}
                >
                    I have dirty windows
                </Button>
            </View>
        </View>
    )
}
export default UserType;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	button: {
		margin: 50,
	},
});