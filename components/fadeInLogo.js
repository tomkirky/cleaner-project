import React, { useRef } from "react";
import { Animated } from "react-native";

const FadeInLogo = (props) => {
	const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

	React.useEffect(() => {
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 8000,
			useNativeDriver: false,
		}).start();
	}, [fadeAnim]);

	return (
		<Animated.View // Special animatable View
			style={{
				...props.style,
				opacity: fadeAnim, // Bind opacity to animated value
				marginTop: 50,
			}}
		>
			{props.children}
		</Animated.View>
	);
};

export default FadeInLogo;
