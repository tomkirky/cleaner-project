import * as React from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import axios from "axios";
import { googleMapsAPI } from "../config";
import { useState, useEffect } from "react";

const Map = () => {
  const [coordinates, setCoordinates] = useState({
    lat: "",
    lng: "",
  });

  useEffect(() => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=24%20Sussex%20Drive%20Ottawa%20ON&key=${googleMapsAPI}`
      )
      .then((result) => {
        const { lat, lng } = result.data.results[0].geometry.location;
        setCoordinates((currCoordinates) => {
          return { ...currCoordinates, lat: lat, lng: lng };
        });
      });
  }, [setCoordinates]);
  // ^^^ getting the response but struggling to set State

  console.log(coordinates.lat);
  https: return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: coordinates.lat,
          longitude: coordinates.lng,
          latitudeDelta: 0.07,
          longitudeDelta: 0.07,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default Map;

// testing gitignore
