import * as React from "react";
import { Button } from "react-native-paper";

export default function FancyButton(props) {
	return (
		<Button
			mode="contained"
			style={{
				padding: 10,
				justifyContent: "center",
				margin: 10,
				marginTop: 30,
				backgroundColor: "#2192BC"
			}}
			{...props}
		/>
	);
}
