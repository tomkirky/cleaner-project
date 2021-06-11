import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

const payment = ({ navigation }) => {
	return (
		<WebView
			source={{
				uri: `https://buy.stripe.com/test_dR6aEOgOw2wgawo7ss`,
			}}
		/>
	);
};

export default payment;

// https://checkout.stripe.com/pay/cs_test_rUoHQb2jPK9BTxr5lI7bcQ9yjWAJkhDG74xblKPl78b2EJf8HAQFhvAR#fidkdWxOYHwnPyd1blpxYHZxWjA0TEhManJGbmtiYURfX39MQ1JuSW9nSGxjY0tVfUlmSG1hS3dOdk9wbUppSVYwMURVY2NgUVFudzRPMF9KfG5KR2ozZEZNQURQM0BOUFZpRGlUQl9vV05dNTVXVHRqcGJkdicpJ3VpbGtuQH11anZgYUxhJz8ncWB2cVpnTFwzdUQ3XW1iQlIxRmYydnAnKSd3YGNgd3dgdyc%2FJ21xcXV2PyoqdnF3bHVgK2ZqaConeCUl
