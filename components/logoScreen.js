import React from "react";
import { View, Image, Text } from "react-native";
import FadeInLogo from "./fadeInLogo";

const LogoScreen = ({ navigation }) => {
	{
		setTimeout(() => {
			navigation.navigate("Login");
		}, 9000);
	} // HOW TO USE THIS???

	return (
		<View
			style={{
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
				paddingTop: 150
			}}
		>
			<FadeInLogo style={{ width: 300, height: 500 }}>
				<Image
					style={{
						width: 400,
						height: 250,

						alignSelf: "center"
					}}
					source={require("../img/clean(2).png")}
				/>
			</FadeInLogo>
		</View>
	);
};

export default LogoScreen;
