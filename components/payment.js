import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

const Payment = ({ navigation, amount }) => {
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
			source={{
				uri: paymentAmounts[amount],
			}}
		/>
	);
};

export default Payment;

// https://checkout.stripe.com/pay/cs_test_rUoHQb2jPK9BTxr5lI7bcQ9yjWAJkhDG74xblKPl78b2EJf8HAQFhvAR#fidkdWxOYHwnPyd1blpxYHZxWjA0TEhManJGbmtiYURfX39MQ1JuSW9nSGxjY0tVfUlmSG1hS3dOdk9wbUppSVYwMURVY2NgUVFudzRPMF9KfG5KR2ozZEZNQURQM0BOUFZpRGlUQl9vV05dNTVXVHRqcGJkdicpJ3VpbGtuQH11anZgYUxhJz8ncWB2cVpnTFwzdUQ3XW1iQlIxRmYydnAnKSd3YGNgd3dgdyc%2FJ21xcXV2PyoqdnF3bHVgK2ZqaConeCUl
