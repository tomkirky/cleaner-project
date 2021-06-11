import * as React from 'react';
import { WebView } from 'react-native-webview';

function Payments() {
    return (
      <WebView source={{ uri: 'https://expo.io' }} style={{ marginTop: 20 }} />
    );
  }


export default Payments;