import React from "react";
import { View, Image, Text } from "react-native";
import FadeInLogo from "./fadeInLogo";

const LogoScreen = (navigation) => {
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
		// setTimeout(()=>{ navigation.navigate("Login") }, 9000) // HOW TO USE THIS???
	);
};

export default LogoScreen;

// const FadeInView = (props) => {
//     const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

//     React.useEffect(() => {
//       Animated.timing(
//         fadeAnim,
//         {
//           toValue: 1,
//           duration: 10000,
//         }
//       ).start();
//     }, [fadeAnim])

//     return (
//       <Animated.View                 // Special animatable View
//         style={{
//           ...props.style,
//           opacity: fadeAnim,         // Bind opacity to animated value
//         }}
//       >
//         {props.children}
//       </Animated.View>
//     );
//   }
