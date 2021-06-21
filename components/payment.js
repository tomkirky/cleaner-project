import React from "react";
import { WebView } from "react-native-webview";

const Payment = ({ amount }) => {
	const paymentAmounts = {
		five: "https://buy.stripe.com/test_3cseV48i05Is8og001",
		ten: "https://buy.stripe.com/test_3cseV4fKs4EocEw8wy",
		fifteen: "https://buy.stripe.com/test_cN29AK0Py8UE9sk8wz",
		twenty: "https://buy.stripe.com/test_3cs6oydCkfj24804gk",
		twentyfive: "https://buy.stripe.com/test_8wM8wGbuc7QA0VOdQV",
		thirty: "https://buy.stripe.com/test_5kA28icyg3AkgUM9AG",
	};

	return (
		<WebView
			style={{ marginTop: 50 }}
			source={{
				uri: paymentAmounts[amount],
			}}
		/>
	);
};

export default Payment;
