import { db, auth } from "../firebase";
import firebase from "firebase";
import { Card } from "react-native-elements";
import React from "react";
import { View, Text, Image, Pressable, ScrollView } from "react-native";
import { useState, useEffect } from "react";

const CleanersList = ({ setCleaner, navigation }) => {
  const [cleaners, setCleaners] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [currentCity, setCurrentCity] = useState("Leeds");
  const list = [];

  const ID = auth.currentUser.uid;
  const docRef = db.collection("clients").doc(`${ID}`);

  useEffect(() => {
    docRef.get().then((doc) => {
      if (doc.exists) {
        setCurrentCity(doc.data().city);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    });
  }, []);

  useEffect(() => {
    db.collection("cleaners")
      .where("city", "==", currentCity)
      .get()
      .then((result) => {
        result.forEach((doc) => {
          const person = doc.data();
          person.id = doc.id;
          list.push(person);
        });
        setCleaners(list);
        setIsLoading(false);
      });
  }, [currentCity]);
  if (isLoading) {
    return <Text>Loading...</Text>;
  } else {
    return (
      <View>
        <ScrollView>
          {cleaners.map((cleaner) => {
            return (
              <Pressable
                onPress={() => {
                  setCleaner(cleaner);
                  navigation.navigate("Profile");
                }}
              >
                <Card>
                  <Card.Title>{cleaner.companyName}</Card.Title>
                  <Card.Divider />
                  <View>
                    <Image source={cleaner.cleanerPhotoURL} />
                    <Text>{cleaner.companyDescription}</Text>
                    <Text>{cleaner.companyCity}</Text>
                  </View>
                </Card>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    );
  }
};

export default CleanersList;
